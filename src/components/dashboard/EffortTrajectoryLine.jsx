import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
} from 'recharts';

const EffortPredictionChart = ({
    effortData,
    currentDay = 50,
    targetScores = [[75, 50], [150, 50], [212, 50]] // Format: [day, score]
}) => {
    // Transform the raw effort array into chart data
    const chartData = effortData.map((effort, index) => ({
        day: index,
        effort: effort
    }));

    // Split data into historical (blue) and predicted (orange) parts
    const historicalData = chartData.slice(0, currentDay + 1);
    const predictedData = chartData.slice(currentDay);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Effort Estimate Based on Target Score</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                type="number"
                                domain={[0, 220]}
                                label={{
                                    value: 'Days from start of course',
                                    position: 'bottom',
                                    offset: -10
                                }}
                            />
                            <YAxis
                                domain={[0, 80]}
                                label={{
                                    value: 'Effort',
                                    angle: -90,
                                    position: 'insideLeft',
                                    offset: -10
                                }}
                            />
                            <Tooltip />

                            {/* Historical effort line (blue) */}
                            <Line
                                data={historicalData}
                                type="monotone"
                                dataKey="effort"
                                stroke="#2563eb"
                                strokeWidth={2}
                                dot={false}
                                isAnimationActive={false}
                            />

                            {/* Predicted effort line (orange) */}
                            <Line
                                data={predictedData}
                                type="monotone"
                                dataKey="effort"
                                stroke="#f97316"
                                strokeWidth={2}
                                dot={false}
                                isAnimationActive={false}
                            />

                            {/* Current day reference line (green) */}
                            <ReferenceLine
                                x={currentDay}
                                stroke="#22c55e"
                                strokeDasharray="5 5"
                                label={{
                                    value: "Current day",
                                    position: 'top',
                                    fill: '#22c55e',
                                    fontSize: 12
                                }}
                            />

                            {/* Target score reference lines (red) */}
                            {targetScores.map(([day, score], index) => (
                                <ReferenceLine
                                    key={day}
                                    x={day}
                                    stroke="#ef4444"
                                    strokeDasharray="5 5"
                                    label={{
                                        value: `Test, target score ${score}`,
                                        position: 'top',
                                        fill: '#ef4444',
                                        fontSize: 12
                                    }}
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

// Example usage with sample data
const ExampleUsage = () => {
    // Sample effort data matching the provided output format
    const sampleEffortData = [
        74, 3, 25, 8, 4, 2, 1, 1, 0.5, 0.5,  // Initial fluctuating pattern
        ...Array(40).fill(0.5),  // Low steady state
        ...Array.from({ length: 25 }, (_, i) => i * 3),  // Rising trend
        ...Array.from({ length: 50 }, (_, i) => {
            const base = 75 - Math.sin(i / 10) * 45;
            return Math.max(30, base);
        }),
        ...Array.from({ length: 50 }, (_, i) => {
            const base = 75 - Math.sin(i / 10) * 45;
            return Math.max(30, base);
        }),
        ...Array.from({ length: 50 }, (_, i) => {
            const base = 75 - Math.sin(i / 10) * 45;
            return Math.max(30, base);
        })
    ];

    return (
        <EffortPredictionChart
            effortData={sampleEffortData}
            currentDay={50}
            targetScores={[[75, 50], [150, 50], [212, 50]]}
        />
    );
};

export default ExampleUsage;