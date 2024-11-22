// lib/api.ts

interface FormData {
    studentId: string;
    codeModule: string;
    codePresentation: string;
    targetScore: string;
    currentDay: string;
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

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function fetchPredictions(formData: FormData): Promise<PredictionResponses> {
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const [demographicsRes, timeProportionsRes, nextScoreRes, passDropRes, effortPredictionRes] =
            await Promise.all([
                fetch(`${BASE_URL}/demographics_success`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({ id_student: parseInt(formData.studentId) })
                }),
                fetch(`${BASE_URL}/target_time_proportion`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        id_student: parseInt(formData.studentId),
                        code_module: formData.codeModule,
                        target_score: parseInt(formData.targetScore)
                    })
                }),
                fetch(`${BASE_URL}/next_score`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        id_student: parseInt(formData.studentId),
                        code_module: formData.codeModule,
                        code_presentation: formData.codePresentation,
                        current_day: parseInt(formData.currentDay)
                    })
                }),
                fetch(`${BASE_URL}/pass_drop`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        id_student: parseInt(formData.studentId),
                        code_module: formData.codeModule,
                        code_presentation: formData.codePresentation,
                        current_day: parseInt(formData.currentDay)
                    })
                }),
                fetch(`${BASE_URL}/effort_prediction`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        id_student: parseInt(formData.studentId),
                        code_module: formData.codeModule,
                        current_day: parseInt(formData.currentDay),
                        target_scores: [[75, parseInt(formData.targetScore)]]
                    })
                })
            ]);

        const [demographics, timeProportions, nextScore, passStatus, effortPrediction] =
            await Promise.all([
                demographicsRes.json(),
                timeProportionsRes.json(),
                nextScoreRes.json(),
                passDropRes.json(),
                effortPredictionRes.json()
            ]);

        return {
            demographicPrediction: demographics,
            timeProportions,
            nextTestScore: nextScore,
            passDropStatus: passStatus,
            effortPrediction
        };
    } catch (error) {
        throw new Error('Failed to fetch predictions: ' + error);
    }
}