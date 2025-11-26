import React from 'react';
import { Map, Database, Info } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-primary-600 p-2 rounded-lg">
              <Map className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              MapScraper<span className="text-primary-600">Pro</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Documentation</a>
            <div className="h-4 w-px bg-gray-300"></div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
              <Database className="w-4 h-4" />
              <span>Gemini 2.5 Flash</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
