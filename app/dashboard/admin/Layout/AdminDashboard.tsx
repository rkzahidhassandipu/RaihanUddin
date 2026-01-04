'use client'
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import Content from './Content';

type TabType = 'hero' | 'about' | 'projects' | "skills" | "testimonials" | 'contact_info';

const AdminDashboard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const validTabs: TabType[] = ['hero', 'about', 'projects', 'skills', 'testimonials', 'contact_info'];

  const tabFromUrl = searchParams.get('tab');  const isValidTab = (tab: string | null): tab is TabType => {
    return tab !== null && validTabs.includes(tab as TabType);
  };
  const [activeTab, setActiveTab] = useState<TabType>(
    isValidTab(tabFromUrl) ? tabFromUrl : 'hero'
  );
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    router.replace(`/dashboard/admin?tab=${tab}`, { scroll: false });
  };

  useEffect(() => {
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100">
      <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
      <Content activeTab={activeTab} />
    </div>
  );
};

export default AdminDashboard;
