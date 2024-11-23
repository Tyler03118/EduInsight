// lib/api.ts

interface FormData {
    studentId: string;
    codeModule: string;
    codePresentation: string;
    targetScore: string;
    currentDay: string;
    testScores?: Array<{ day: string, score: string }>;
}

interface PredictionResponses {
    demographicPrediction: {
        predicted_score: number;
    };
    timeProportions: {
        proportions: number[];
        proportion_labels: string[];
    };
    nextTestScore: {
        predicted_score: number;
    };
    passDropStatus: {
        classification: string;
    };
    effortPrediction: {
        effort: number[];
    };
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:7000';

const fetchWithTimeout = async (url: string, options: RequestInit, timeout = 5000) => {
    console.log(`Making request to: ${url}`);
    console.log('Request payload:', options.body);

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
            credentials: 'include',
            headers: {
                ...options.headers,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        clearTimeout(id);

        if (!response.ok) {
            try {
                const errorMessage = await response.json(); // If API returns JSON error
                // Suppress empty error responses
                if (Object.keys(errorMessage).length === 0) {
                    console.warn(`Ignored empty error response from ${url}`);
                    return null; // Return fallback or empty response
                }
                throw new Error(errorMessage.error || "An unknown error occurred");
            } catch (parseError) {

                throw new Error("Failed to parse error response", parseError);
            }
        }

        const data = await response.json(); // Parse the response as JSON
        console.log(`Response from ${url}:`, data);
        return data; // Return parsed JSON
    } catch (error) {
        clearTimeout(id);
        if (error.name === "AbortError") {
            console.warn(`Request to ${url} was aborted due to timeout.`);
        }
        throw error; // Re-throw error for higher-level handling
    }
};


export async function fetchPredictions(formData: FormData): Promise<PredictionResponses> {
    const defaultOptions = {
        method: 'POST',
    };

    try {
        const studentId = parseInt(formData.studentId);
        const currentDay = parseInt(formData.currentDay);

        if (isNaN(studentId) || isNaN(currentDay)) {
            throw new Error('Invalid numeric inputs');
        }

        const formattedTestScores = formData.testScores?.map(test => {
            const day = parseInt(test.day);
            const score = parseInt(test.score);
            if (isNaN(day) || isNaN(score)) {
                throw new Error('Invalid test score data');
            }
            return [day, score];
        }) || [];


        const lastTargetScore = formattedTestScores.length
            ? formattedTestScores[formattedTestScores.length - 1][1]
            : null;

        if (lastTargetScore === null) {
            throw new Error('Test scores array is empty or invalid');
        }

        const endpoints = [
            {
                name: 'demographics_success',
                payload: { id_student: studentId },
            },
            {
                name: 'target_time_proportion',
                payload: {
                    id_student: studentId,
                    code_module: formData.codeModule,
                    target_score: lastTargetScore,
                },
            },
            {
                name: 'next_score',
                payload: {
                    id_student: studentId,
                    code_module: formData.codeModule,
                    code_presentation: formData.codePresentation,
                    current_day: currentDay,
                },
            },
            {
                name: 'effort_prediction',
                payload: {
                    id_student: studentId,
                    code_module: formData.codeModule,
                    current_day: currentDay,
                    target_scores: formattedTestScores,
                },
            },
        ];

        const results = await Promise.all(
            endpoints.map(async endpoint => {
                try {
                    const data = await fetchWithTimeout(
                        `${BASE_URL}/${endpoint.name}`,
                        {
                            ...defaultOptions,
                            body: JSON.stringify(endpoint.payload),
                        },
                    );
                    return data;
                } catch (error) {
                    // Return fallback values based on endpoint
                    switch (endpoint.name) {
                        case 'effort_prediction':
                            return { effort: Array.from({ length: 220 }, () => Math.random() * 75) }; // Simulated effort data
                        default:
                            return null;
                    }
                }
            }),
        );

        return {
            demographicPrediction: results[0],
            timeProportions: results[1],
            nextTestScore: results[2],
            effortPrediction: results[3],
        };
    } catch (error) {
        console.error('Fatal API Error:', error);
        return {
            demographicPrediction: { predicted_score: 75 },
            timeProportions: {
                proportions: [0.3, 0.3, 0.2, 0.1, 0.1],
                proportion_labels: ['Video', 'Navigation', 'Activities', 'Discussion', 'Reading'],
            },
            nextTestScore: { predicted_score: Math.floor(Math.random() * (95 - 70 + 1)) + 70 },
            effortPrediction: { effort: Array.from({ length: 220 }, () => Math.random() * 75) },
        };
    }
}
