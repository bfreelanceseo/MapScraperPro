import React, { useState, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { SearchForm } from './components/SearchForm';
import { ResultsTable } from './components/ResultsTable';
import { searchPlaces } from './services/geminiService';
import { parseMarkdownTable, convertToCSV } from './utils/parser';
import { BusinessLead, GeoLocation } from './types';
import { AlertCircle, FileSpreadsheet, Copy, Database, RefreshCw, ChevronDown, Maximize2, Minimize2, Trash2 } from 'lucide-react';

// Keep track of the parameters used for the current set of results
interface SearchParams {
  query: string;
  location?: GeoLocation;
  category: string;
}

const App: React.FC = () => {
  const [results, setResults] = useState<BusinessLead[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rawText, setRawText] = useState<string>('');
  const [showRaw, setShowRaw] = useState(false);
  const [showFullRaw, setShowFullRaw] = useState(false);
  
  // Ref to store the current search params to support "Load More"
  const activeSearchRef = useRef<SearchParams | null>(null);

  const handleSearch = useCallback(async (query: string, useLocation: boolean, category: string) => {
    setIsSearching(true);
    setError(null);
    setResults([]);
    setRawText('');
    setShowFullRaw(false);
    activeSearchRef.current = null;

    let location: GeoLocation | undefined;

    if (useLocation) {
        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
        } catch (e) {
            console.warn("Location permission denied or unavailable");
            // Proceed without location
        }
    }

    // Save params for pagination
    activeSearchRef.current = { query, location, category };

    try {
      const markdown = await searchPlaces(query, location, category);
      setRawText(markdown);
      const parsedData = parseMarkdownTable(markdown);
      
      if (parsedData.length === 0) {
         setError("No structured data could be parsed from the results. Try a different query or location.");
      } else {
         setResults(parsedData);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while fetching data.");
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleLoadMore = async () => {
    if (!activeSearchRef.current) return;
    
    setIsLoadingMore(true);
    const { query, location, category } = activeSearchRef.current;
    
    try {
      // Get list of existing names to exclude
      const existingNames = results.map(r => r.name);
      
      const markdown = await searchPlaces(query, location, category, existingNames);
      
      // Append raw text for debugging if needed
      setRawText(prev => prev + "\n\n--- NEXT BATCH ---\n\n" + markdown);
      
      const newLeads = parseMarkdownTable(markdown);
      
      // Filter out duplicates that might have slipped through (case insensitive name match)
      const uniqueNewLeads = newLeads.filter(newLead => 
        !results.some(existing => existing.name.toLowerCase() === newLead.name.toLowerCase())
      );

      if (uniqueNewLeads.length === 0) {
        // Just show a small alert, don't clear results
        alert("No additional unique results were found by the model.");
      } else {
        setResults(prev => [...prev, ...uniqueNewLeads]);
      }
    } catch (err: any) {
      console.error("Failed to load more:", err);
      alert("Failed to load more results: " + err.message);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleClearResults = () => {
    setResults([]);
    setRawText('');
    setError(null);
    setShowFullRaw(false);
    activeSearchRef.current = null;
  };

  const handleDownload = (format: 'csv') => {
    if (results.length === 0) return;
    
    const csvContent = convertToCSV(results);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `map_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = () => {
      const csvContent = convertToCSV(results);
      navigator.clipboard.writeText(csvContent);
      alert("Copied CSV data to clipboard!");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Automate your <br className="hidden sm:block" />
            <span className="text-primary-600">Maps Data Collection</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Export business leads, restaurants, and places directly to CSV in seconds using AI-powered grounding.
          </p>
        </div>

        <SearchForm onSearch={handleSearch} isSearching={isSearching || isLoadingMore} />

        {error && (
          <div className="mb-8 rounded-xl bg-red-50 p-4 border border-red-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-red-800">Error encountered</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
                {rawText && (
                    <button 
                        onClick={() => setShowRaw(!showRaw)}
                        className="mt-2 text-xs font-semibold underline text-red-800 hover:text-red-900"
                    >
                        {showRaw ? "Hide Raw Output" : "Show Raw Output (for debugging)"}
                    </button>
                )}
              </div>
            </div>
            {showRaw && (
                 <div className="mt-4 bg-gray-100 rounded-lg border border-gray-300 overflow-hidden">
                    <div className="px-4 py-2 bg-gray-200 border-b border-gray-300 flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-600">Response Data ({rawText.length} chars)</span>
                        {rawText.length > 500 && (
                            <button 
                                onClick={() => setShowFullRaw(!showFullRaw)}
                                className="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-800 font-medium transition-colors"
                            >
                                {showFullRaw ? (
                                    <>
                                        <Minimize2 className="w-3 h-3" /> Show Summary
                                    </>
                                ) : (
                                    <>
                                        <Maximize2 className="w-3 h-3" /> Show All
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                    <pre className={`p-4 text-xs overflow-auto whitespace-pre-wrap font-mono text-gray-700 transition-all duration-300 ${showFullRaw ? 'max-h-[600px]' : 'max-h-48'}`}>
                        {!showFullRaw && rawText.length > 500 
                            ? rawText.slice(0, 500) + "\n\n... [Content Truncated]" 
                            : rawText}
                    </pre>
                 </div>
            )}
          </div>
        )}

        {!error && results.length > 0 && (
          <div className="space-y-4 animate-fade-in-up pb-12">
            <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Found {results.length} results
              </h2>
              <div className="flex gap-2 w-full sm:w-auto">
                 <button
                  onClick={handleClearResults}
                  disabled={isLoadingMore}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-red-50 hover:text-red-700 hover:border-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear
                </button>
                 <button
                  onClick={copyToClipboard}
                  disabled={isLoadingMore}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-50"
                >
                  <Copy className="mr-2 h-4 w-4 text-gray-500" />
                  Copy CSV
                </button>
                <button
                  onClick={() => handleDownload('csv')}
                  disabled={isLoadingMore}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:opacity-50"
                >
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Export CSV
                </button>
              </div>
            </div>

            <ResultsTable data={results} />
            
            {/* Load More Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="group relative inline-flex items-center justify-center px-8 py-3 border border-primary-200 text-base font-medium rounded-full text-primary-700 bg-primary-50 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-sm hover:shadow-md w-full sm:w-auto min-w-[200px]"
              >
                {isLoadingMore ? (
                  <>
                    <RefreshCw className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Loading more...
                  </>
                ) : (
                  <>
                    Load More Results
                    <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
        
        {!isSearching && results.length === 0 && !error && (
            <div className="mt-16 text-center">
                 <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-sm mb-4">
                    <Database className="w-8 h-8 text-gray-300" />
                 </div>
                 <h3 className="text-lg font-medium text-gray-900">No data collected yet</h3>
                 <p className="mt-1 text-gray-500">Select a category and enter a query to start scraping Google Maps data.</p>
                 
                 <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 max-w-4xl mx-auto">
                     {[
                         { q: "Coworking spaces", cat: "Real Estate" },
                         { q: "Sushi bars in Seattle", cat: "Restaurants" }, 
                         { q: "Car repair shops", cat: "Automotive" }
                     ].map((example) => (
                         <button 
                            key={example.q}
                            onClick={() => handleSearch(example.q, false, example.cat)}
                            className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-primary-300 hover:text-primary-600 hover:shadow-sm transition-all text-left flex flex-col gap-1"
                         >
                            <span className="font-semibold">{example.cat}</span>
                            <span>"{example.q}"</span>
                         </button>
                     ))}
                 </div>
            </div>
        )}
      </main>
      
       <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-400">
                Powered by Gemini 2.5 Flash & Google Maps Grounding. 
                <br/>
                Note: This is an AI-assisted tool. Data accuracy depends on the model's grounding capabilities.
            </p>
        </div>
      </footer>
    </div>
  );
};

export default App;