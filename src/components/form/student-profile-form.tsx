import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { User, Brain } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { InfoIcon } from "lucide-react";

// Constants from OULAD dataset
const CODE_MODULES = ['AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF', 'GGG'];
const MODULE_DISPLAY_MAP = {
    'AAA': { display: 'Computing & IT', description: 'Computer Science and Information Technology' },
    'BBB': { display: 'Mathematics', description: 'Pure and Applied Mathematics' },
    'CCC': { display: 'Social Sciences', description: 'Sociology, Psychology, and Related Fields' },
    'DDD': { display: 'STEM', description: 'Science, Technology, Engineering, and Mathematics' },
    'EEE': { display: 'Arts & Humanities', description: 'Fine Arts, Literature, and Cultural Studies' },
    'FFF': { display: 'Natural Sciences', description: 'Physics, Chemistry, and Biology' },
    'GGG': { display: 'Engineering', description: 'Various Engineering Disciplines' }
};
const CODE_PRESENTATIONS = ['2013J', '2014J', '2013B', '2014B'];
const PRESENTATION_DISPLAY_MAP = {
    '2013J': '2024F', // Fall 2024
    '2013B': '2024S', // Spring 2024
    '2014J': '2025F', // Fall 2025
    '2014B': '2025S', // Spring 2025
};
const REGIONS = [
    "Northeast",
    "Midwest",
    "South",
    "West",
    "Pacific",
    "Outside US"
];

const AGE_BANDS = [
    { value: "14-18", label: "High School (14-18)" },
    { value: "19-22", label: "College Age (19-22)" },
    { value: "23-30", label: "Young Professional (23-30)" },
    { value: "31-40", label: "Mid-Career (31-40)" },
    { value: "41-plus", label: "Experienced (41+)" }
];

const IMD_BANDS = [
    { value: "0-10", label: "0-10%" },
    { value: "10-20", label: "10-20%" },
    { value: "20-30", label: "20-30%" },
    { value: "30-40", label: "30-40%" },
    { value: "40-50", label: "40-50%" },
    { value: "50-60", label: "50-60%" },
    { value: "60-70", label: "60-70%" },
    { value: "70-80", label: "70-80%" },
    { value: "80-90", label: "80-90%" },
    { value: "90-100", label: "90-100%" }
];

const LEARNING_STYLES = [
    { value: 'visual', label: 'Visual Learning' },
    { value: 'auditory', label: 'Auditory Learning' },
    { value: 'reading', label: 'Reading/Writing' },
    { value: 'kinesthetic', label: 'Hands-on Learning' }
];

const MAJORS = [
    { value: 'accounting', label: 'Accounting' },
    { value: 'advertising', label: 'Advertising' },
    { value: 'aerospace_engineering', label: 'Aerospace Engineering' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'anthropology', label: 'Anthropology' },
    { value: 'architecture', label: 'Architecture' },
    { value: 'artificial_intelligence', label: 'Artificial Intelligence' },
    { value: 'asian_studies', label: 'Asian Studies' },
    { value: 'astronomy', label: 'Astronomy' },
    { value: 'biochemistry', label: 'Biochemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'biomedical_engineering', label: 'Biomedical Engineering' },
    { value: 'business_admin', label: 'Business Administration' },
    { value: 'chemical_engineering', label: 'Chemical Engineering' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'civil_engineering', label: 'Civil Engineering' },
    { value: 'cognitive_science', label: 'Cognitive Science' },
    { value: 'communications', label: 'Communications' },
    { value: 'computer_science', label: 'Computer Science' },
    { value: 'creative_writing', label: 'Creative Writing' },
    { value: 'criminology', label: 'Criminology' },
    { value: 'cultural_studies', label: 'Cultural Studies' },
    { value: 'cybersecurity', label: 'Cybersecurity' },
    { value: 'data_analytics', label: 'Data Analytics' },
    { value: 'data_science', label: 'Data Science' },
    { value: 'digital_media', label: 'Digital Media' },
    { value: 'early_childhood', label: 'Early Childhood Education' },
    { value: 'economics', label: 'Economics' },
    { value: 'education', label: 'Education' },
    { value: 'educational_tech', label: 'Educational Technology' },
    { value: 'electrical_engineering', label: 'Electrical Engineering' },
    { value: 'english', label: 'English' },
    { value: 'entrepreneurship', label: 'Entrepreneurship' },
    { value: 'environmental_science', label: 'Environmental Science' },
    { value: 'film_studies', label: 'Film & Media Studies' },
    { value: 'finance', label: 'Finance' },
    { value: 'fine_arts', label: 'Fine Arts' },
    { value: 'foreign_languages', label: 'Foreign Languages' },
    { value: 'forestry', label: 'Forestry' },
    { value: 'gender_studies', label: 'Gender Studies' },
    { value: 'geography', label: 'Geography' },
    { value: 'graphic_design', label: 'Graphic Design' },
    { value: 'history', label: 'History' },
    { value: 'industrial_design', label: 'Industrial Design' },
    { value: 'industrial_engineering', label: 'Industrial Engineering' },
    { value: 'information_systems', label: 'Information Systems' },
    { value: 'interior_design', label: 'Interior Design' },
    { value: 'international_business', label: 'International Business' },
    { value: 'international_relations', label: 'International Relations' },
    { value: 'journalism', label: 'Journalism' },
    { value: 'kinesiology', label: 'Kinesiology' },
    { value: 'legal_studies', label: 'Legal Studies' },
    { value: 'linguistics', label: 'Linguistics' },
    { value: 'marine_science', label: 'Marine Science' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'mechanical_engineering', label: 'Mechanical Engineering' },
    { value: 'music', label: 'Music' },
    { value: 'neuroscience', label: 'Neuroscience' },
    { value: 'nursing', label: 'Nursing' },
    { value: 'paralegal', label: 'Paralegal Studies' },
    { value: 'pharmacy', label: 'Pharmacy' },
    { value: 'philosophy', label: 'Philosophy' },
    { value: 'physics', label: 'Physics' },
    { value: 'political_science', label: 'Political Science' },
    { value: 'pre_law', label: 'Pre-Law' },
    { value: 'pre_med', label: 'Pre-Medicine' },
    { value: 'psychology', label: 'Psychology' },
    { value: 'public_health', label: 'Public Health' },
    { value: 'public_relations', label: 'Public Relations' },
    { value: 'sociology', label: 'Sociology' },
    { value: 'software_engineering', label: 'Software Engineering' },
    { value: 'special_education', label: 'Special Education' },
    { value: 'supply_chain', label: 'Supply Chain Management' },
    { value: 'sustainability', label: 'Sustainability Studies' },
    { value: 'theater', label: 'Theater & Performance Arts' },
    { value: 'urban_studies', label: 'Urban Studies' }
];


// Sample student IDs from OULAD with their characteristics
const SAMPLE_STUDENTS = [
    {
        id: '6516',
        description: 'Student major in Computing'
    },
    {
        id: '8462',
        description: 'Student major in STEM'
    },
    {
        id: '29764',
        description: 'Student major in Social Sciences'
    }
];



const PredictionForm = ({ onSubmit, loading = false }) => {

    const [testScores, setTestScores] = useState([
        { day: '75', score: '80' },
        { day: '150', score: '95' },
    ]);

    // Add helper functions
    const handleAddTestScore = () => {
        setTestScores([...testScores, { day: '', score: '' }]);
    };

    const handleRemoveTestScore = (index) => {
        const newScores = testScores.filter((_, i) => i !== index);
        setTestScores(newScores);
    };

    const handleTestScoreChange = (index, field, value) => {
        const newScores = [...testScores];
        newScores[index][field] = value;
        setTestScores(newScores);
    };

    // Update isFormValid to include test score validation
    const isFormValid = () => {
        const validModule = CODE_MODULES.includes(requiredInputs.codeModule);
        const validPresentation = CODE_PRESENTATIONS.includes(requiredInputs.codePresentation);
        const validCurrentDay = isValidCurrentDay(requiredInputs.currentDay);
        const validTestScores = testScores.every(score =>
            isValidTestScore(score.score)
        );

        return validModule && validPresentation && validCurrentDay && validTestScores;
    };

    // Add validation functions
    const isValidTestScore = (score) => {
        const num = Number(score);
        return !isNaN(num) && num >= 0 && num <= 100;
    };

    const isValidTestDay = (testDay, currentDay) => {
        const testNum = Number(testDay);
        const currentNum = Number(currentDay);
        return !isNaN(testNum) && testNum > currentNum;
    };

    // Required inputs for API
    const [requiredInputs, setRequiredInputs] = useState({
        studentId: '',
        codeModule: '',
        codePresentation: '',
        targetScore: '',
        currentDay: '10'
    });

    // Demo inputs (not used in API calls but for demonstration)
    const [demoInputs, setDemoInputs] = useState({
        // Demographics
        gender: '',
        ageBand: '',
        region: '',
        education: '',
        imdBand: '',
        disability: 'N',

        // Academic Background
        major: '',
        studiedCredits: '60',
        previousGPA: '',

        // Learning Preferences
        learningStyle: '',
        studyHoursPerWeek: '',
        preferredStudyTime: '',
        workStyle: ''
    });

    const handleRequiredInputChange = (field, value) => {
        setRequiredInputs(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleDemoInputChange = (field, value) => {
        setDemoInputs(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // TODO: implement onSubmit
    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure form is valid before proceeding
        if (!isFormValid()) {
            console.error('Form is invalid. Please check the inputs.');
            return;
        }

        // Prepare the updated form data with testScores replacing targetScore
        const updatedInputs = {
            ...requiredInputs,
            testScores: testScores.map((test) => ({
                day: test.day,
                score: test.score,
            })),
        };

        try {
            // Submit updated form data to the API
            onSubmit(updatedInputs);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    const isValidTargetScore = (score) => {
        const num = Number(score);
        return !isNaN(num) && num > 0 && num <= 100;
    };

    const isValidCurrentDay = (day) => {
        const num = Number(day);
        return !isNaN(num) && num > 0;
    };



    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Student Performance Prediction</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="demo" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="demo">Student Profile</TabsTrigger>
                        <TabsTrigger value="real">Required Information</TabsTrigger>
                    </TabsList>

                    <TabsContent value="demo" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Demographics Section */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Demographics
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Gender</Label>
                                        <Select
                                            value={demoInputs.gender}
                                            onValueChange={(value) => handleDemoInputChange('gender', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="M">Male</SelectItem>
                                                <SelectItem value="F">Female</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Age Band</Label>
                                        <Select
                                            value={demoInputs.ageBand}
                                            onValueChange={(value) => handleDemoInputChange('ageBand', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select age band" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {AGE_BANDS.map(band => (
                                                    <SelectItem key={band.value} value={band.value}>
                                                        {band.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Region</Label>
                                        <Select
                                            value={demoInputs.region}
                                            onValueChange={(value) => handleDemoInputChange('region', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select region" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {REGIONS.map(region => (
                                                    <SelectItem key={region} value={region}>
                                                        {region}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>IMD Band</Label>
                                        <Select
                                            value={demoInputs.imdBand}
                                            onValueChange={(value) => handleDemoInputChange('imdBand', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select IMD band" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {IMD_BANDS.map(band => (
                                                    <SelectItem key={band.value} value={band.value}>
                                                        {band.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Academic Background Section */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Brain className="w-4 h-4" />
                                        Academic Background
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Major/Field of Study</Label>
                                        <Select
                                            value={demoInputs.major}
                                            onValueChange={(value) => handleDemoInputChange('major', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select major" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {MAJORS.map(major => (
                                                    <SelectItem key={major.value} value={major.value}>
                                                        {major.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Previous GPA (0.0-4.0)</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            max="4"
                                            step="0.1"
                                            value={demoInputs.previousGPA}
                                            onChange={(e) => handleDemoInputChange('previousGPA', e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Learning Style</Label>
                                        <Select
                                            value={demoInputs.learningStyle}
                                            onValueChange={(value) => handleDemoInputChange('learningStyle', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select learning style" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {LEARNING_STYLES.map(style => (
                                                    <SelectItem key={style.value} value={style.value}>
                                                        {style.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Study Hours per Week</Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            value={demoInputs.studyHoursPerWeek}
                                            onChange={(e) => handleDemoInputChange('studyHoursPerWeek', e.target.value)}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="real" className="space-y-4">
                        {/* Required Inputs Section */}
                        <Card>
                            <CardContent className="space-y-4 pt-4">
                                {/* Student ID Selection */}
                                <div className="space-y-2">
                                    <Label>
                                        <Label>Student ID</Label>
                                    </Label>
                                    <Input
                                        type="number"
                                        placeholder="Enter student ID (e.g., 6516)"
                                        value={requiredInputs.studentId}
                                        onChange={(e) => handleRequiredInputChange('studentId', e.target.value)}
                                        className={!requiredInputs.studentId ? "border-red-200" : ""}
                                    />
                                    <div className="mt-2">
                                        <Label className="text-sm text-gray-500">Sample Student IDs:</Label>
                                        <div className="mt-1 space-y-1">
                                            {SAMPLE_STUDENTS.map((student) => (
                                                <div
                                                    key={student.id}
                                                    className="text-sm text-gray-600 cursor-pointer hover:text-blue-600 flex items-center gap-2"
                                                    onClick={() => handleRequiredInputChange('studentId', student.id)}
                                                >
                                                    <span className="font-medium">{student.id}</span>
                                                    <span className="text-gray-400">-</span>
                                                    <span className="text-gray-500">{student.description}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Module Selection */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Label>
                                                <Label>Course Topic</Label>
                                            </Label>
                                            <HoverCard>
                                                <HoverCardTrigger asChild>
                                                    <InfoIcon className="h-4 w-4 text-gray-400 cursor-help" />
                                                </HoverCardTrigger>
                                                <HoverCardContent className="w-80">
                                                    <div className="space-y-2">
                                                        <h4 className="font-semibold">About Course Topics</h4>
                                                        <p className="text-sm">
                                                            Available course topics and their focus areas:
                                                        </p>
                                                        <div className="text-sm space-y-1">
                                                            {Object.entries(MODULE_DISPLAY_MAP).map(([code, info]) => (
                                                                <div key={code} className="space-y-1">
                                                                    <p className="font-medium">{info.display}</p>
                                                                    <p className="text-gray-500 text-xs pl-2">
                                                                        {info.description}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </HoverCardContent>
                                            </HoverCard>
                                        </div>
                                        <Select
                                            value={requiredInputs.codeModule}
                                            onValueChange={(value) => handleRequiredInputChange('codeModule', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select course topic" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {CODE_MODULES.map((module) => (
                                                    <SelectItem key={module} value={module}>
                                                        {MODULE_DISPLAY_MAP[module].display}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        {requiredInputs.codeModule && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                {MODULE_DISPLAY_MAP[requiredInputs.codeModule].description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Presentation Selection */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Label>
                                                <Label>Semester</Label>
                                            </Label>
                                            <HoverCard>
                                                <HoverCardTrigger asChild>
                                                    <InfoIcon className="h-4 w-4 text-gray-400 cursor-help" />
                                                </HoverCardTrigger>
                                                <HoverCardContent className="w-80">
                                                    <div className="space-y-2">
                                                        <h4 className="font-semibold">About Semesters</h4>
                                                        <p className="text-sm">
                                                            Select which semester you want to analyze:
                                                        </p>
                                                        <div className="text-sm space-y-1">
                                                            <p>• 2024S - Spring Semester 2024</p>
                                                            <p>• 2024F - Fall Semester 2024</p>
                                                            <p>• 2025S - Spring Semester 2025</p>
                                                            <p>• 2025F - Fall Semester 2025</p>
                                                        </div>
                                                        <p className="text-sm text-gray-500 mt-2">
                                                            'F' indicates Fall semester
                                                            <br />
                                                            'S' indicates Spring semester
                                                        </p>
                                                    </div>
                                                </HoverCardContent>
                                            </HoverCard>
                                        </div>
                                        <Select
                                            value={requiredInputs.codePresentation}
                                            onValueChange={(value) => handleRequiredInputChange('codePresentation', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select semester" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {CODE_PRESENTATIONS.map((pres) => (
                                                    <SelectItem key={pres} value={pres}>
                                                        {PRESENTATION_DISPLAY_MAP[pres]} ({pres.includes('J') ? 'Fall' : 'Spring'})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Current Day Input */}
                                    <div className="space-y-2">
                                        <Label>Current Day
                                            <p className='space-y-2 text-xs'>(Make sure you have tests result before this date)</p>
                                        </Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            value={requiredInputs.currentDay}
                                            onChange={(e) => handleRequiredInputChange('currentDay', e.target.value)}
                                            placeholder="Enter current day"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4 mt-4">
                                    <div className="flex items-center justify-between">
                                        <Label>Test Scores and Dates</Label>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handleAddTestScore}
                                            size="sm"
                                        >
                                            Add Test
                                        </Button>
                                    </div>

                                    {testScores.map((test, index) => (
                                        <div key={index} className="grid grid-cols-2 gap-4 items-center">
                                            <div className="space-y-2">
                                                <Label>Test Day {index + 1}</Label>
                                                <Input
                                                    type="number"
                                                    min={requiredInputs.currentDay}
                                                    value={test.day}
                                                    onChange={(e) => handleTestScoreChange(index, 'day', e.target.value)}
                                                    placeholder="Enter test day"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Target Score {index + 1}</Label>
                                                <div className="flex gap-2">
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        value={test.score}
                                                        onChange={(e) => handleTestScoreChange(index, 'score', e.target.value)}
                                                        placeholder="Enter target score"
                                                    />
                                                    {testScores.length > 1 && (
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="icon"
                                                            onClick={() => handleRemoveTestScore(index)}
                                                        >
                                                            ×
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                <Button
                    onClick={handleSubmit}
                    className="w-full mt-6"
                    disabled={loading || !isFormValid()}
                >
                    {loading ? "Processing..." : "Get Predictions"}
                </Button>

            </CardContent>
        </Card>
    );
};

export default PredictionForm;