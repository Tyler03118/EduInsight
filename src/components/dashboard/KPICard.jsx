import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';

const KPICard = ({ title, value, description, Icon, gradientFrom, gradientTo }) => {
    // Define gradient classes based on props
    const gradientClass = `bg-gradient-to-br from-${gradientFrom}-500 to-${gradientTo}-600`;

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
                    ${gradientClass} 
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
                {/* Background glow effect */}
                <div
                    className={`
                        absolute 
                        inset-0 
                        bg-gradient-to-br 
                        from-white/0 
                        to-white/10
                        opacity-0 
                        group-hover:opacity-100 
                        transition-opacity 
                        duration-300
                    `}
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
                                {typeof value === 'number' ? `${value}%` : value}
                            </motion.h3>
                            <p className="text-sm mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                                {description}
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
