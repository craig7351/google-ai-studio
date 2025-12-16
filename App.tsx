import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { AppCard } from './components/AppCard';
import { loadApps } from '@/src/utils/appLoader';
import { AppCategory, AppEntry } from './types';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(AppCategory.ALL);
  const [apps, setApps] = useState<AppEntry[]>(() => loadApps());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filter apps based on selection
  const filteredApps = selectedCategory === AppCategory.ALL
    ? apps
    : apps.filter(app => app.category === selectedCategory);

  return (
    <div className="flex h-screen bg-studio-bg overflow-hidden text-studio-text font-sans">

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}


      {/* Sidebar */}
      <Sidebar
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setIsSidebarOpen(false); // Close on mobile select
        }}
        // onOpenSubmit removed
        onOpenSubmit={() => { }}
        isOpen={isSidebarOpen}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Bar */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-studio-border bg-studio-bg sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 -ml-2 text-studio-subtext hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-studio-text">
              {selectedCategory}
            </h1>
            <span className="text-sm px-2.5 py-0.5 rounded-full bg-studio-surface text-studio-subtext border border-studio-border">
              {filteredApps.length} apps
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Profile or other top right actions could go here */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
              U
            </div>
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            {filteredApps.length > 0 ? (
              // Adjusted grid: Removed 2xl:grid-cols-4 and lg:grid-cols-3 to make cards wider/larger
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredApps.map(app => (
                  <AppCard key={app.id} app={app} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                <div className="w-16 h-16 bg-studio-surface rounded-full flex items-center justify-center mb-4">
                  <Menu className="w-8 h-8 text-studio-subtext opacity-50" />
                </div>
                <h3 className="text-lg font-medium text-studio-text mb-2">No apps found</h3>
                <p className="text-studio-subtext max-w-sm">
                  There are no apps in the {selectedCategory} category yet.
                </p>
              </div>
            )}

            {/* Bottom spacer */}
            <div className="h-12" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;