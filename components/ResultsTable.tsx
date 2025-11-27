import React from 'react';
import { BusinessLead } from '../types';
import { Phone } from 'lucide-react';

interface ResultsTableProps {
  data: BusinessLead[];
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ data }) => {
  if (data.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
      <div className="overflow-x-auto custom-scrollbar flex-1">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky top-0 bg-gray-50 z-10 w-2/3">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky top-0 bg-gray-50 z-10 w-1/3">Phone</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-lg">
                      {row.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{row.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {row.phone && row.phone !== 'N/A' && row.phone !== '' ? (
                    <div className="flex items-center text-sm text-gray-600 gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {row.phone}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
        <span>Showing {data.length} results</span>
        <span>Data provided by Google Maps Grounding</span>
      </div>
    </div>
  );
};