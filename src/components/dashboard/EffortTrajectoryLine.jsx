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

export const EffortTrajectoryLine = ({
    effortData = [], // Default to an empty array
    currentDay = 5, // Start with day 5 as the minimum
    targetScores = [], // Default to an empty array
}) => {
    if (!effortData.length) {
        console.error('Invalid or missing effortData:', effortData);
        return <div>No Effort Data Available</div>;
    }

    // Limit data to 150 days
    const limitedEffortData = effortData.slice(0, Math.ceil(200 / 5)); // Only include points up to day 150

    // Map effort data to a chart-friendly format starting from day 5
    const chartData = limitedEffortData.map((effort, index) => ({
        day: index * 5 + 5, // Increment days by 5 starting at 5
        effort: parseFloat(effort.toFixed(2)), // Ensure numeric effort values
    }));

    // Split data into historical (before currentDay) and predicted (after currentDay)
    const historicalData = chartData.filter((data) => data.day <= currentDay);
    const predictedData = chartData.filter((data) => data.day > currentDay);

    // Ensure seamless connection between historical and predicted data
    if (predictedData.length > 0 && historicalData.length > 0) {
        const lastHistoricalPoint = historicalData[historicalData.length - 1];
        predictedData.unshift({ ...lastHistoricalPoint }); // Add the last historical point as the first predicted point
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Effort Estimate Based on Target Score</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={chartData}
                            margin={{
                                top: 50,    // Increased to give space for the title or labels
                                right: 50,  // Added to avoid cutting off the right labels
                                left: 50,   // Added to avoid cutting off the left Y-axis labels
                                bottom: 50, // Increased to give space for X-axis labels
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="day"
                                type="number"
                                domain={[5, 150]} // Limit X-axis to 150 days
                                label={{
                                    value: 'Days from start of course',
                                    position: 'bottom',
                                    offset: 5, // Adjusted to move the label below the tick marks
                                }}
                            />
                            <YAxis
                                dataKey="effort"
                                domain={[0, Math.max(...chartData.map((d) => d.effort)) + 20]}
                                label={{
                                    value: 'Effort',
                                    angle: -90,
                                    position: 'insideLeft',
                                    offset: -20, // Adjusted to prevent overlapping with the chart area
                                }}
                            />
                            <Tooltip
                                formatter={(value) => `${value}`} // Show only the effort value in the tooltip
                                contentStyle={{ fontSize: 12 }} // Style the tooltip text
                            />
                            <Line
                                data={historicalData}
                                type="monotone"
                                dataKey="effort"
                                stroke="#2563eb"
                                strokeWidth={2}
                                dot={false}
                            />
                            <Line
                                data={predictedData}
                                type="monotone"
                                dataKey="effort"
                                stroke="#f97316"
                                strokeWidth={2}
                                dot={false}
                            />
                            <ReferenceLine
                                x={currentDay}
                                stroke="#22c55e"
                                strokeDasharray="5 5"
                                label={{
                                    value: 'Current day',
                                    position: 'top',
                                    fill: '#22c55e',
                                    fontSize: 12,
                                }}
                            />
                            {targetScores.map(([day, score], index) => (
                                <ReferenceLine
                                    key={`target-${index}`}
                                    x={day}
                                    stroke="#ef4444"
                                    strokeDasharray="5 5"
                                    label={{
                                        value: `Test (Target: ${score})`,
                                        position: 'top',
                                        fill: '#ef4444',
                                        fontSize: 12,
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
