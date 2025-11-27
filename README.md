# MapScraper Pro

MapScraper Pro is an AI-powered automated tool designed to collect business leads from Google Maps efficiently. Built with React and powered by Google's Gemini 2.5 Flash model, it uses Google Maps Grounding to extract accurate real-world data and exports it directly to CSV or Excel.

## 🌟 Key Features

*   **Smart AI Extraction**: Utilizes Gemini 2.5 Flash with Grounding to find relevant businesses with high accuracy.
*   **Category Filtering**: Narrow down searches by industry (Restaurants, Hotels, Retail, Real Estate, etc.).
*   **Geolocation Support**: Option to use your current location for hyper-local "Near Me" searches.
*   **Clean Data Output**: Automatically parses results into a structured "Name" and "Phone" format.
*   **Pagination (Load More)**: Intelligently requests *new* results by excluding businesses already found in the session.
*   **Multi-Format Export**: Download your leads as **CSV** or **Excel (.xlsx)** files with a single click.
*   **Duplicate Detection**: Automatically filters out duplicate entries to ensure your list is unique.
*   **Responsive UI**: Modern, clean interface built with Tailwind CSS.

## 🚀 Installation & Setup

This is a client-side React application. To run it locally:

1.  **Clone the repository** or download the source code.
2.  **API Key**: You need a Google Gemini API key.
    *   Get your key from [Google AI Studio](https://aistudiocdn.com).
    *   Set the environment variable `API_KEY` in your environment or build process.
3.  **Run the App**:
    *   If using a simple static server, serve the root directory.
    *   If integrated into a build pipeline, ensure `index.tsx` is your entry point.

*Note: This project uses ES Modules via `<script type="importmap">` in `index.html`. It requires a modern browser to run without a bundler.*

## 📖 User Guide

### 1. Starting a Search
1.  **Select a Category**: Choose the industry you are interested in (e.g., "Automotive") from the dropdown.
2.  **Enter Query**: Type your search term. Be specific about location (e.g., "Car repair shops in Miami").
3.  **Location Bias (Optional)**: Click the **Map Pin** icon to prioritize results near your physical location.
4.  **Click Start**: The AI will scrape Google Maps data and display the results in a table.

### 2. Managing Results
*   **Load More**: Scroll to the bottom and click "Load More Results" to fetch additional businesses. The system will try to find businesses not already in your list.
*   **Clear**: Click the "Clear" (Trash) button to reset the search and start over.
*   **Debug**: If an error occurs, you can toggle the "Raw Output" to see the raw text returned by the AI.

### 3. Exporting Data
Once you have collected your leads:
*   **Copy CSV**: Copies the data to your clipboard for quick pasting.
*   **CSV**: Downloads a `.csv` file.
*   **Excel**: Downloads a `.xlsx` file formatted for Microsoft Excel.

## 🛠 Technologies

*   **Frontend**: React 19, Tailwind CSS
*   **AI Model**: Google Gemini 2.5 Flash (@google/genai)
*   **Data Parsing**: Custom Markdown parser & SheetJS (xlsx) for exports
*   **Icons**: Lucide React

## 📄 License

MapScraper Pro is a tool for educational and productivity purposes. Ensure you comply with Google Maps Terms of Service when using extracted data.

---
*Powered by Best Freelance SEO & Google Maps Grounding.*