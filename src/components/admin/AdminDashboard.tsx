import React, { useState } from 'react';
import { LogOut, Database, Users, Briefcase, DollarSign, Settings } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import ServicesManager from './ServicesManager';
import SolutionsManager from './SolutionsManager';
import TeamManager from './TeamManager';
import PricingManager from './PricingManager';

type TabType = 'services' | 'solutions' | 'team' | 'pricing';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>('services');
  const { user, logout } = useAuth();

  const tabs = [
    { id: 'services' as TabType, label: 'Services', icon: Database, color: 'text-cyan-400' },
    { id: 'solutions' as TabType, label: 'Solutions', icon: Briefcase, color: 'text-purple-400' },
    { id: 'team' as TabType, label: 'Team', icon: Users, color: 'text-pink-400' },
    { id: 'pricing' as TabType, label: 'Pricing', icon: DollarSign, color: 'text-green-400' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'services':
        return <ServicesManager />;
      case 'solutions':
        return <SolutionsManager />;
      case 'team':
        return <TeamManager />;
      case 'pricing':
        return <PricingManager />;
      default:
        return <ServicesManager />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white font-mono">
                  CyberForge Admin
                </h1>
                <p className="text-gray-400 text-sm">
                  Welcome back, {user?.username}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-400/20 to-purple-500/20 border border-cyan-400/50 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? tab.color : ''}`} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            <div className="cyber-card">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;