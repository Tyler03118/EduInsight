import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';

const KPICard = ({ title, value, description, Icon, gradientFrom, gradientTo }) => {
    // Generate random risk level for the 4th card
    const getRiskLevel = () => {
        return Math.random() < 0.5 ? 'LOW' : 'MEDIUM(on track)';
    };

    // Enhanced value formatting for educational metrics
    const formattedValue = () => {
        if (value === null || value === undefined) {
            return 'N/A';
        }

        // Format based on metric type
        switch (title.toLowerCase()) {
            case 'final score prediction':
                return `${Math.round(value)}%`;
            case 'next test score':
                return `${Math.round(value)}%`;
            case 'course status':
                return value; // Already formatted as 'Pass'
            case 'risk level':
                return getRiskLevel();
            default:
                return typeof value === 'number' ? `${Math.round(value)}%` : value;
        }
    };

    // Enhanced gradient selection based on metric type
    const getGradientClass = () => {
        switch (title.toLowerCase()) {
            case 'final score prediction':
                return value >= 80 ? 'bg-gradient-to-br from-green-500 to-green-600' :
                    value >= 60 ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' :
                        'bg-gradient-to-br from-red-500 to-red-600';
            case 'next test score':
                return value >= 80 ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                    value >= 60 ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                        'bg-gradient-to-br from-pink-500 to-pink-600';
            case 'course status':
                return 'bg-gradient-to-br from-green-500 to-green-600';
            case 'risk level':
                const riskLevel = formattedValue();
                return riskLevel === 'LOW'
                    ? 'bg-gradient-to-br from-green-500 to-green-600'
                    : 'bg-gradient-to-br from-yellow-500 to-yellow-600';
            default:
                return `bg-gradient-to-br from-${gradientFrom}-500 to-${gradientTo}-600`;
        }
    };

    // Enhanced description based on metric type
    const getDescription = () => {
        switch (title.toLowerCase()) {
            case 'final score prediction':
                return value >= 80 ? 'Excellent performance!' :
                    value >= 60 ? 'Good progress, keep improving!' :
                        'Needs attention';
            case 'next test score':
                return value >= 80 ? 'Strong prediction!' :
                    value >= 60 ? 'On track - keep studying!' :
                        'Additional practice recommended';
            case 'course status':
                return 'On track to succeed!';
            case 'risk level':
                const riskLevel = formattedValue();
                return riskLevel === 'LOW'
                    ? 'Keep up the good work!'
                    : 'Maintain current progress';
            default:
                return description;
        }
    };

    return (
        <motion.div
            whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
        >
            <Card
                className={`
                    ${getGradientClass()}
                    text-white
                    transition-all
                    duration-300
                    hover:shadow-xl
                    hover:shadow-${gradientFrom}-500/20
                    relative
                    overflow-hidden
                    group
                `}
            >
                <div
                    className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <CardContent className="p-6 relative">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                                {title}
                            </p>
                            <motion.h3
                                className="text-3xl font-bold"
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                            >
                                {formattedValue()}
                            </motion.h3>
                            <p className="text-sm mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                                {getDescription()}
                            </p>
                        </div>
                        <motion.div
                            whileHover={{
                                rotate: 5,
                                scale: 1.1
                            }}
                            transition={{ duration: 0.2 }}
                        >
                            <Icon className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-all duration-300" />
                        </motion.div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default KPICard;