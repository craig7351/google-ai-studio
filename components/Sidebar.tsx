import React from 'react';
import {
  LayoutGrid,
  Gamepad2,
  GraduationCap,
  CheckSquare,
  Users,
  Film,
  Camera,
  HeartPulse,
  Plus,
  Box
} from 'lucide-react';
import { AppCategory } from '../types';
import { CATEGORIES } from '../constants';

interface SidebarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenSubmit: () => void;
  isOpen: boolean;
}

const IconMap: Record<string, React.ElementType> = {
  LayoutGrid,
  Gamepad2,
  GraduationCap,
  CheckSquare,
  Users,
  Film,
  Camera,
  HeartPulse
};

export const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, onSelectCategory, onOpenSubmit, isOpen }) => {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-30 w-64 transform bg-studio-sidebar border-r border-studio-border transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="h-16 flex items-center px-6 border-b border-studio-border">
          <div className="flex items-center gap-2 text-studio-text font-semibold text-xl">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Box className="w-5 h-5 text-white" />
            </div>
            <span>One-liner APP</span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex-1 overflow-y-auto px-3 pb-4">
          <div className="text-xs font-medium text-studio-subtext uppercase tracking-wider px-4 mb-2 mt-2">
            Categories
          </div>
          <nav className="space-y-0.5">
            {CATEGORIES.map((cat) => {
              const Icon = IconMap[cat.icon] || LayoutGrid;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-medium transition-colors
                    ${isSelected
                      ? 'bg-[#004A77] text-blue-200'
                      : 'text-studio-subtext hover:bg-studio-surface hover:text-studio-text'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-300' : 'text-studio-subtext'}`} />
                  {cat.id}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Contact Info Footer */}
        <div className="p-4 border-t border-studio-border text-xs text-studio-subtext">
          <div className="mb-2">
            Author: Craig Huang
          </div>
          <div className="mb-1">
            <a href="mailto:craig7351@gmail.com" className="hover:text-blue-300 transition-colors">
              craig7351@gmail.com
            </a>
          </div>
          <div>
            <a
              href="https://www.facebook.com/profile.php?id=61584339789020"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};