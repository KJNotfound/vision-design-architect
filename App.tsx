
import React, { useState, useRef } from 'react';
import { AppStatus, GenerationResult } from './types';
import { generateTechnicalDrawing } from './services/geminiService';
import Button from './components/Button';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [context, setContext] = useState<string>('');
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setStatus(AppStatus.IDLE);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage) return;

    try {
      setStatus(AppStatus.GENERATING);
      setError(null);

      const base64Data = selectedImage.split(',')[1];
      const mimeType = selectedImage.match(/data:(.*?);/)?.[1] || 'image/png';

      const generatedUrl = await generateTechnicalDrawing(base64Data, mimeType, context);

      if (generatedUrl) {
        setResult({
          imageUrl: generatedUrl,
          originalImage: selectedImage,
          prompt: context || "Technical 3-view drawing",
          timestamp: Date.now()
        });
        setStatus(AppStatus.SUCCESS);
      } else {
        throw new Error("The AI drafting engine failed to produce a rendering.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Blueprint generation failed. Please try again.");
      setStatus(AppStatus.ERROR);
    }
  };

  const reset = () => {
    setSelectedImage(null);
    setResult(null);
    setStatus(AppStatus.IDLE);
    setError(null);
    setContext('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white shadow-xl">
               <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">Vision Architect</h1>
              <p className="text-xs text-blue-600 font-bold uppercase tracking-widest">Industrial Design Engine</p>
            </div>
          </div>
          <div className="flex gap-4">
            {selectedImage && (
              <Button variant="ghost" onClick={reset} className="text-gray-400 hover:text-gray-900">Reset Workspace</Button>
            )}
          </div>
        </div>
      </header>

      {/* Workspace */}
      <main className="flex-grow max-w-7xl mx-auto w-full p-6 md:p-10">
        {!selectedImage && !result ? (
          <div className="max-w-3xl mx-auto text-center mt-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-full mb-6">NEXT-GEN PROTOTYPING</span>
            <h2 className="text-5xl font-black text-gray-900 mb-6 leading-[1.1]">Convert Products to Technical Blueprints.</h2>
            <p className="text-gray-500 mb-12 text-xl max-w-2xl mx-auto leading-relaxed">The ultimate tool for industrial designers. Upload a photo and generate precise 3-view orthographic drawings in seconds.</p>
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-[2.5rem] p-16 bg-white hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-100 transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-24 h-24 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-blue-200">
                  <svg className="w-12 h-12 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-gray-900">Upload Product Assets</p>
                <p className="text-gray-500 mt-3 text-lg">Select a JPG, PNG or WebP image</p>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
            {/* Left Sidebar: Controls */}
            <div className="xl:col-span-4 space-y-8">
              <section className="bg-white rounded-[2rem] border border-gray-200 p-8 shadow-sm">
                <div className="mb-8">
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Drafting Context</h3>
                  <textarea 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none min-h-[120px] transition-all"
                    placeholder="e.g. 'Red mooncake with a Red Double Happiness pattern in the center' or 'Minimalist ergonomic chair with chrome base'..."
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                  />
                  <p className="text-[10px] text-gray-400 mt-2 font-medium">Describe specific patterns, materials, or features to preserve.</p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Reference Source</h3>
                  <div className="relative group rounded-2xl overflow-hidden aspect-video bg-gray-100 border border-gray-200 shadow-inner">
                    <img src={selectedImage || ''} alt="Source" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white"
                    >
                      <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                      <span className="text-xs font-bold uppercase tracking-wider">Replace Asset</span>
                    </button>
                  </div>
                </div>

                <Button 
                  className="w-full h-16 text-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 rounded-2xl" 
                  isLoading={status === AppStatus.GENERATING}
                  onClick={handleGenerate}
                  disabled={status === AppStatus.GENERATING}
                >
                  {status === AppStatus.GENERATING ? 'Drafting Blueprint...' : 'Generate 3-View View'}
                </Button>
                
                {error && (
                  <div className="mt-4 p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-sm font-medium">
                    {error}
                  </div>
                )}
              </section>

              <div className="p-6 bg-gray-900 rounded-[2rem] text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">System Status</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Engine</span>
                    <span className="text-gray-300 font-mono">GEMINI-2.5-VISION</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Projection</span>
                    <span className="text-gray-300 font-mono">ORTHOGRAPHIC</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Main: Output */}
            <div className="xl:col-span-8">
              <section className="bg-white rounded-[2.5rem] border border-gray-200 p-2 shadow-2xl min-h-[600px] flex flex-col overflow-hidden relative">
                {/* Blueprint Paper Effect */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                
                <div className="relative z-10 flex-grow flex flex-col">
                  <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white/80 backdrop-blur-md rounded-t-[2.3rem]">
                    <div className="flex items-center gap-4">
                       <span className="px-2 py-0.5 rounded text-[10px] font-black bg-gray-100 text-gray-500 uppercase tracking-tighter">SHEET 001</span>
                       <h3 className="text-sm font-bold text-gray-900">ARCHITECTURAL RENDER</h3>
                    </div>
                    {result && (
                      <div className="flex gap-4">
                        <button className="text-xs font-bold text-blue-600 hover:underline">SHARE</button>
                        <a 
                          href={result.imageUrl} 
                          download="technical-blueprint.png"
                          className="px-4 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-bold hover:bg-black transition-colors"
                        >
                          EXPORT AS PNG
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-grow flex items-center justify-center p-12">
                    {status === AppStatus.GENERATING ? (
                      <div className="text-center">
                        <div className="w-20 h-20 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin mx-auto mb-8 shadow-sm"></div>
                        <p className="text-gray-900 font-black text-xl mb-2">Simulating Dimensions...</p>
                        <p className="text-gray-400 text-sm font-medium">Extracting vectors from raster data</p>
                      </div>
                    ) : result ? (
                      <div className="w-full h-full animate-in fade-in zoom-in-95 duration-700">
                        <img 
                          src={result.imageUrl} 
                          alt="3-view drawing" 
                          className="max-w-full h-auto mx-auto rounded-xl shadow-2xl border border-gray-100"
                        />
                      </div>
                    ) : (
                      <div className="text-center max-w-sm mx-auto">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                           <svg className="w-10 h-10 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        </div>
                        <h4 className="text-gray-400 font-bold mb-2">Output Stage Ready</h4>
                        <p className="text-gray-300 text-sm leading-relaxed italic">Configure your drafting context and initiate generation to see the technical blueprint.</p>
                      </div>
                    )}
                  </div>

                  <div className="p-6 border-t border-gray-100 text-center">
                     <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Vision Architect v2.5 • Proprietary Design Engine • All Rights Reserved</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}
      </main>

      {/* Modern Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center font-black text-xs">V</div>
             <span className="text-sm font-bold text-gray-500">© 2025 Vision Labs</span>
          </div>
          <div className="flex gap-8 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <a href="#" className="hover:text-blue-600 transition-colors">Enterprise</a>
            <a href="#" className="hover:text-blue-600 transition-colors">API Access</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Engine Optimized</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
