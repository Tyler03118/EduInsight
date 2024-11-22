// Student Profile Types
export interface StudentProfile {
    basicInfo: {
        id: string;
        firstName: string;
        lastName: string;
        age: number;
        educationLevel: 'highSchool' | 'bachelor' | 'master' | 'phd';
        major: string;
        previousGPA: number;
    };
    learningPreferences: {
        preferredTimes: string[];
        studyHoursPerWeek: number;
        learningStyle: 'visual' | 'auditory' | 'reading' | 'kinesthetic';
        preferredResources: string[];
    };
    goals: {
        targetGrade: number;
        specificSkills: string[];
        completionTimeline: number;
    };
    interactionPreferences: {
        groupWorkPreference: 'individual' | 'group' | 'mixed';
        communicationStyle: string;
        feedbackFrequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
    };
}

// Analytics Types
export interface PerformanceMetrics {
    currentScore: number;
    predictedScore: number;
    improvementRate: number;
    riskLevel: 'low' | 'medium' | 'high';
}

export interface CompetencyData {
    subject: string;
    score: number;
    fullMark: number;
}

export interface LearningPatternData {
    timeSlot: string;
    efficiency: number;
    attention: number;
}

export interface Recommendation {
    type: 'Resource' | 'Schedule' | 'Practice';
    title: string;
    relevance: number;
    reason: string;
}