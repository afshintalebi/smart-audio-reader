'use client';

import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null); 
      setError('');
    }
  };

  // Handle form submission to the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    setError('');
    
    // Create FormData object to send the file
    const formData = new FormData();
    formData.append('audio', file);

    try {
      // Send a POST request to our Next.js API route
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Update state with the successful response
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4 sm:p-8">
      
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10">
        
        // Header Section
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2">
          Smart Audio Reader
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Upload an audio file to instantly detect language and extract text with high accuracy.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          // Custom stylized file input area
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-40 sm:h-48 border-2 border-indigo-300 border-dashed rounded-2xl cursor-pointer bg-indigo-50 hover:bg-indigo-100 transition duration-300">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-10 h-10 mb-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 border 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p className="mb-2 text-sm text-gray-600 font-semibold">
                  {file ? file.name : "Click to upload an audio file"}
                </p>
                <p className="text-xs text-gray-500">MP3, WAV, M4A, WEBM (Max: 25MB)</p>
              </div>
              // Hidden actual file input
              <input 
                type="file" 
                className="hidden" 
                accept="audio/*" 
                onChange={handleFileChange} 
              />
            </label>
          </div>

          // Submit Button with Loading State
          <button
            type="submit"
            disabled={!file || isLoading}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 shadow-lg
              ${!file || isLoading 
                ? 'bg-gray-400 cursor-not-allowed shadow-none' 
                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/50'
              }
            `}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing with AI...
              </span>
            ) : 'Transcribe Audio'}
          </button>
        </form>

        // Error Message Display
        {error && (
          <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg">
            <p className="font-bold">Error:</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        // Result Display Area
        {result && (
          <div className="mt-8 animate-fade-in-up">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
                <h3 className="text-lg font-bold text-gray-800">Transcription Result</h3>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wider">
                  Language: {result.language}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap" dir="auto">
                {result.text}
              </p>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}