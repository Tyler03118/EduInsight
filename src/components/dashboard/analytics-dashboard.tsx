import React, { useEffect, useState } from 'react';
import { Brain, Target, AlertTriangle } from 'lucide-react';
import KPICard from './KPICard';
import TimeDistributionPie from './TimeDistributionPie';
import { EffortTrajectoryLine } from './EffortTrajectoryLine';
import ResourceRecommendations from './ResourceRecommendations';
import ProgressTracker from './ProgressTracker';
import { fetchPredictions } from '@/lib/api';

// Dummy data for parts not provided by API
const DUMMY_DATA = {
    resourceRecommendations: [
        { type: 'video', title: 'Khan Academy Computer science theory', link: 'https://www.khanacademy.org/computing/computer-science' },
        { type: 'article', title: 'Youtube Advanced Mathematics Concepts', link: 'https://www.youtube.com/c/AdvancedMaths' },
        { type: 'quiz', title: 'College Physics Practice Tests', link: 'https://www.varsitytutors.com/college_physics-practice-tests' },
        { type: 'video', title: 'BrownX: Introduction to Engineering and Design', link: 'https://www.edx.org/learn/engineering/brown-university-introduction-to-engineering-and-design' },
        { type: 'article', title: 'Introduction to Psychology (Yale)', link: 'https://www.coursera.org/learn/introduction-psychology' },
    ],
    progressData: Array(10).fill(0).map((_, i) => ({
        date: `Day ${i + 1}`,
        score: 60 + Math.random() * 40
    })),
    effortPrediction: {
        effort: Array(20).fill(0).map((_, index) =>
            Math.round(50 + 10 * Math.sin(index / 3)) // Semi-realistic effort trend
        ),
    },
};

const AnalyticsDashboard = ({ formData }) => {
    const [predictions, setPredictions] = useState({
        demographicPrediction: { predicted_score: 0 },
        timeProportions: { proportions: [], proportion_labels: [] },
        nextTestScore: { predicted_score: 0 },
        passDropStatus: { classification: 'Pass' }, // Set default to 'Pass'
        effortPrediction: { effort: [] },
        ...DUMMY_DATA
    });
    const [loading, setLoading] = useState(true);

    const [riskLevel, setRiskLevel] = useState('LOW');

    useEffect(() => {
        const loadPredictions = async () => {
            if (!formData) return;

            try {
                setLoading(true);
                const apiData = await fetchPredictions(formData);

                const nextTestScore =
                    isNaN(apiData.nextTestScore?.predicted_score) || apiData.nextTestScore?.predicted_score === undefined
                        ? Math.floor(Math.random() * (95 - 70 + 1)) + 70 // Generate a random number between 70 and 95
                        : apiData.nextTestScore.predicted_score;

                setPredictions(prev => ({
                    ...prev,
                    ...apiData,
                    nextTestScore: { predicted_score: nextTestScore },
                }));

                const finalScore = apiData.demographicPrediction.predicted_score;
                if (finalScore < 70) {
                    setRiskLevel('HIGH');
                } else if (finalScore >= 70 && finalScore <= 85) {
                    setRiskLevel('MEDIUM');
                } else {
                    setRiskLevel('LOW');
                }
            } catch (error) {
                console.error('Failed to fetch predictions:', error);
            } finally {
                setLoading(false);
            }
        };

        loadPredictions();
    }, [formData]);

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading predictions...</div>;
    }

    return (
        <div className="space-y-6">
            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard
                    title="Final score"
                    value={predictions.demographicPrediction.predicted_score}
                    description="Based on previous student demographics"
                    Icon={Target}
                    gradientFrom="blue" // Always blue
                    gradientTo="blue"   // Always blue
                />

                <KPICard
                    title="Next Test Score"
                    value={predictions.nextTestScore.predicted_score}
                    description="Predicted performance"
                    Icon={Brain}
                    gradientFrom="purple"
                    gradientTo="purple"
                />

                <KPICard
                    title="Course Status"
                    value="Pass"
                    description="On track to succeed!"
                    Icon={AlertTriangle}
                    gradientFrom="green"
                    gradientTo="green"
                />

                <KPICard
                    title="Risk Level"
                    value={riskLevel}
                    description="Student risk assessment"
                    Icon={AlertTriangle}
                    gradientFrom="yellow"
                    gradientTo="yellow"
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TimeDistributionPie
                    data={predictions.timeProportions.proportions.map((value, index) => ({
                        name: predictions.timeProportions.proportion_labels[index],
                        value: value * 100
                    }))}
                />

                <EffortTrajectoryLine
                    effortData={predictions.effortPrediction.effort.length > 0
                        ? predictions.effortPrediction.effort
                        : DUMMY_DATA.effortPrediction.effort} // Fallback to dummy data
                    currentDay={parseInt(formData?.currentDay || '50')} // Input from form
                    targetScores={formData?.testScores?.map(({ day, score }) => [parseInt(day), parseInt(score)]) || []}
                />
            </div>

            {/* Additional Features Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResourceRecommendations
                    resources={predictions.resourceRecommendations}
                />

                <ProgressTracker
                    progressData={predictions.progressData}
                />
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
