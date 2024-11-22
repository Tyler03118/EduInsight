'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StudentProfileForm from '@/components/form/student-profile-form';
import AnalyticsDashboard from '@/components/dashboard/analytics-dashboard';

export default function Home() {
  const [formData, setFormData] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      setFormData(data);
      setActiveTab('dashboard'); // Switch to dashboard tab after submission
    } catch (error) {
      console.error('Error handling form submission:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Student Profile</TabsTrigger>
          <TabsTrigger value="dashboard">Analytics Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <StudentProfileForm onSubmit={handleFormSubmit} loading={loading} />
        </TabsContent>

        <TabsContent value="dashboard">
          <AnalyticsDashboard formData={formData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}