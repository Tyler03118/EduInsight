import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

// Extended color palette with matching colors for the 5 categories
const COLORS = [
    '#2563eb', // Navigation - Blue
    '#f97316', // Video Content - Orange
    '#16a34a', // Interactive Activities - Green
    '#8b5cf6', // Discussions - Purple
    '#ea580c'  // Reading Material - Deep Orange
];

// Custom tooltip to show percentage with 1 decimal place
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 shadow-lg rounded-lg border">
                <p className="font-medium">{payload[0].name}</p>
                <p className="text-sm text-gray-600">
                    {`${payload[0].value.toFixed(1)}% of study time`}
                </p>
            </div>
        );
    }
    return null;
};

// Custom legend to show percentage next to each item
const CustomLegend = ({ payload }) => {
    return (
        <ul className="flex flex-wrap justify-center gap-4 mt-4">
            {payload.map((entry, index) => (
                <li
                    key={`legend-${index}`}
                    className="flex items-center gap-2"
                >
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm">
                        {entry.value}: {entry.payload.value.toFixed(1)}%
                    </span>
                </li>
            ))}
        </ul>
    );
};

const TimeDistributionPie = ({ data }) => {
    // Transform the proportions and labels into pie chart data
    const chartData = data.map((item) => ({
        name: item.name,
        value: item.value,
    }));

    return (
        <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Recommended Time Distribution
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[350px]"> {/* Increased height for better visibility */}
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="45%" // Moved up slightly to accommodate legend
                                labelLine={false}
                                outerRadius={110}
                                innerRadius={60} // Added innerRadius for donut chart effect
                                fill="#8884d8"
                                dataKey="value"
                                paddingAngle={2} // Added padding between segments
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        className="hover:opacity-80 transition-opacity duration-300"
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                content={<CustomLegend />}
                                verticalAlign="bottom"
                                align="center"
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default TimeDistributionPie;