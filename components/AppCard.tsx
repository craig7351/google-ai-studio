import React from 'react';
import { ExternalLink } from 'lucide-react';
import { AppEntry } from '../types';

interface AppCardProps {
  app: AppEntry;
}

export const AppCard: React.FC<AppCardProps> = ({ app }) => {
  return (
    <div className="bg-studio-surface rounded-2xl overflow-hidden border border-studio-border hover:border-gray-500 transition-all duration-200 flex flex-col h-full group shadow-lg">
      {/* Large Single Image */}
      <div className="w-full h-64 bg-black/20 relative overflow-hidden">
        {app.images.length > 0 ? (
          <img
            src={app.images[0]}
            alt={`${app.name} screenshot`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-studio-bg text-studio-subtext">
            No screenshot
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900/30 text-blue-300 border border-blue-800/50">
            {app.category}
          </div>
        </div>

        <h3 className="text-2xl font-bold text-studio-text mb-2">{app.name}</h3>
        <p className="text-studio-subtext text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">
          {app.description}
        </p>

        {app.prompt && (
          <div className="mb-4 p-3 bg-studio-surface border border-studio-border rounded-lg">
            <h4 className="text-xs uppercase tracking-wider text-studio-subtext mb-1 font-semibold">Prompt</h4>
            <code className="text-xs text-studio-text block font-mono whitespace-pre-wrap line-clamp-4">
              {app.prompt}
            </code>
          </div>
        )}

        <a
          href={app.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 w-full py-3 bg-[#0B57D0] hover:bg-[#0842A0] text-white rounded-full text-sm font-medium transition-colors"
        >
          View App
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};