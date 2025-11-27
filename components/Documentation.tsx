import React from 'react';
import { ArrowLeft, Search, MapPin, Building2, Download, RefreshCw, Database } from 'lucide-react';

interface DocumentationProps {
  onBack: () => void;
}

export const Documentation: React.FC<DocumentationProps> = ({ onBack }) => {
  return (
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <button 
          onClick={onBack}
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Search
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-primary-50 px-8 py-10 border-b border-gray-100">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            Documentation & User Guide
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Learn how to use MapScraper Pro to efficiently discover business leads and export data using the power of Google Gemini AI.
          </p>
        </div>

        <div className="p-8 lg:p-12 space-y-12">
          {/* Section 1: Getting Started */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Search className="w-6 h-6 text-primary-600" />
              Getting Started
            </h2>
            <div className="prose prose-blue max-w-none text-gray-600">
              <p className="mb-4">
                MapScraper Pro utilizes Google's Gemini 2.5 Flash model with Grounding (Real-time Google Maps access) to find accurate business information. Follow these simple steps to start collecting data:
              </p>
              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  <strong className="text-gray-900">Select a Category:</strong> Choose a specific industry (e.g., Restaurants, Retail, Real Estate) from the dropdown menu to help the AI narrow down the business type.
                </li>
                <li>
                  <strong className="text-gray-900">Enter a Query:</strong> Type what you are looking for. Be specific about the location. 
                  <br />
                  <em>Example: "Italian restaurants in downtown Chicago" or "Plumbers near Austin, Texas"</em>
                </li>
                <li>
                  <strong className="text-gray-900">Use Location (Optional):</strong> Click the <MapPin className="w-4 h-4 inline mx-1" /> map pin icon to use your current geolocation. This is helpful for "near me" searches.
                </li>
                <li>
                  <strong className="text-gray-900">Click Start:</strong> The AI will process your request and return a list of leads containing Names and Phone numbers.
                </li>
              </ol>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 2: Features */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Database className="w-6 h-6 text-primary-600" />
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center mb-4 text-primary-600">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Category Filtering</h3>
                <p className="text-sm text-gray-600">
                  Refine your search by selecting specific business categories. This adds context to the AI prompt, ensuring results are relevant to your industry vertical.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center mb-4 text-primary-600">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Smart Pagination</h3>
                <p className="text-sm text-gray-600">
                  Need more than the initial results? Click "Load More Results". The system remembers your previous findings and explicitly asks the AI for <em>new</em> businesses not already listed.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center mb-4 text-primary-600">
                  <Download className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">One-Click Export</h3>
                <p className="text-sm text-gray-600">
                  Export your compiled list of leads directly to a CSV file compatible with Excel, Google Sheets, or your CRM. You can also copy the CSV data to your clipboard.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center mb-4 text-primary-600">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Search Management</h3>
                <p className="text-sm text-gray-600">
                  Easily manage your session. Clear results to start fresh, or toggle the "Raw Output" view to see exactly what the AI returned for debugging purposes.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 3: Troubleshooting */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Troubleshooting & Tips</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0"></div>
                <span>
                  <strong>"No structured data found" Error:</strong> This usually happens if the AI couldn't find businesses matching your specific criteria in that exact location. Try broadening your location (e.g., using the city name instead of a zip code) or removing strict category filters.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0"></div>
                <span>
                  <strong>N/A in Phone Numbers:</strong> Not all businesses have a phone number listed on Google Maps, or the AI may not have access to it in the summarized view. The tool marks these as N/A automatically.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0"></div>
                <span>
                  <strong>Duplicate Results:</strong> The "Load More" feature attempts to exclude previous names, but slight spelling variations on Google Maps might occasionally cause a duplicate. We automatically filter exact name matches locally before adding them to your list.
                </span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
