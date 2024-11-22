// src/components/ResourceRecommendations.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Video, FileText } from 'lucide-react';

const ResourceRecommendations = ({ resources }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Resource Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {resources.map((resource, index) => (
                        <li key={index} className="flex items-center gap-2">
                            {resource.type === 'video' && <Video />}
                            {resource.type === 'article' && <BookOpen />}
                            {resource.type === 'quiz' && <FileText />}
                            <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                {resource.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};

export default ResourceRecommendations;
