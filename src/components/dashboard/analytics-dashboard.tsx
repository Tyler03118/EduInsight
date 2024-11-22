import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Brain, Target, AlertTriangle, Clock } from 'lucide-react';
import KPICard from './KPICard';
import TimeDistributionPie from './TimeDistributionPie';
import EffortTrajectoryLine from './EffortTrajectoryLine';
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
    }))
};

const AnalyticsDashboard = ({ formData }) => {
    const [predictions, setPredictions] = useState({
        demographicPrediction: { predicted_score: 0 },
        timeProportions: { proportions: [], proportion_labels: [] },
        nextTestScore: { predicted_score: 0 },
        passDropStatus: { classification: 'pass' },
        effortPrediction: { effort: [] },
        ...DUMMY_DATA
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPredictions = async () => {
            if (!formData) return;

            try {
                setLoading(true);
                const apiData = await fetchPredictions(formData);
                setPredictions(prev => ({
                    ...prev,
                    ...apiData
                }));
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

    // Get recommended focus
    const recommendedFocus = predictions.timeProportions.proportion_labels[
        predictions.timeProportions.proportions.indexOf(
            Math.max(...predictions.timeProportions.proportions)
        )
    ];
    const recommendedFocusPercentage = Math.round(
        Math.max(...predictions.timeProportions.proportions) * 100
    );

    // Transform effort data for chart
    const effortData = predictions.effortPrediction.effort.map((value, index) => ({
        day: index + 1,
        effort: parseFloat(value.toFixed(2))
    }));

    return (
        <div className="space-y-6">
            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard
                    title="Final Score Prediction"
                    value={predictions.demographicPrediction.predicted_score}
                    description="Based on demographics"
                    Icon={Target}
                    gradientFrom="blue"
                    gradientTo="blue"
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
                    title="Course Outcome"
                    value={predictions.passDropStatus.classification}
                    description={predictions.passDropStatus.classification === 'pass' ?
                        'On track to succeed!' : 'May need additional support'}
                    Icon={AlertTriangle}
                    gradientFrom={predictions.passDropStatus.classification === 'pass' ?
                        'green' : 'red'}
                    gradientTo={predictions.passDropStatus.classification === 'pass' ?
                        'green' : 'red'}
                />

                <KPICard
                    title="Recommended Focus"
                    value={recommendedFocus}
                    description={`${recommendedFocusPercentage}% of study time`}
                    Icon={Clock}
                    gradientFrom="orange"
                    gradientTo="orange"
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
                    data={effortData}
                    currentDay={parseInt(formData?.currentDay || '50')}
                    examDays={[75, 150, 212]}
                    examScores={[90, 100, 95]}
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