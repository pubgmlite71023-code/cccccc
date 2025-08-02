import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { MainPage } from './components/MainPage';
import { Navigation } from './components/Navigation';
import { ExamSchedule } from './components/ExamSchedule';
import { SearchSection } from './components/SearchSection';
import { ResultCard } from './components/ResultCard';
import { StatsSection } from './components/StatsSection';
import { AllResultsSection } from './components/AllResultsSection';
import { Footer } from './components/Footer';
import { Clock, AlertCircle, BookOpen } from 'lucide-react';
import { rankedStudents } from './data/students';
import { calculateStats } from './utils/contestStats';
import { Student } from './types';

function App() {
  const [searchResult, setSearchResult] = useState<Student | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [currentPage, setCurrentPage] = useState<'main' | 'results' | 'schedule'>('main');
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const stats = calculateStats(rankedStudents);

  // Stop audio when leaving main page
  useEffect(() => {
    if (currentPage !== 'main' && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [currentPage]);

  const handleSearchResult = (student: Student | null) => {
    setSearchResult(student);
    setSearchAttempted(true);
  };

  const handleNavigation = (page: 'results' | 'schedule') => {
    setCurrentPage(page);
  };

  const handleFullNavigation = (page: 'main' | 'results' | 'schedule') => {
    setCurrentPage(page);
    
    // Stop audio when navigating away from main page
    if (page !== 'main' && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Reset search when navigating
    if (page !== 'results') {
      setSearchResult(null);
      setSearchAttempted(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Global audio reference for main page */}
      <audio ref={audioRef} style={{ display: 'none' }} />
      
      {currentPage === 'main' ? (
        <MainPage onNavigate={(page) => handleFullNavigation(page)} />
      ) : (
        <>
          <Header />
          
          <Navigation currentPage={currentPage} onNavigate={handleFullNavigation} />
          
          {currentPage === 'results' ? (
            <>
              <SearchSection 
                students={rankedStudents} 
                onResult={handleSearchResult}
              />
              
              {/* Search Results */}
              {searchAttempted && (
                <section className="py-12 bg-gray-50">
                  <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">
                      <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 border-2 border-orange-200 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                        {/* Background decorative elements */}
                        <div className="absolute top-4 right-4 text-orange-200 opacity-30">
                          <Clock className="w-16 h-16 animate-spin-slow" />
                        </div>
                        <div className="absolute bottom-4 left-4 text-yellow-200 opacity-20">
                          <BookOpen className="w-12 h-12 animate-bounce-slow" />
                        </div>
                        
                        <div className="text-center relative z-10">
                          <div className="flex justify-center items-center gap-3 mb-6">
                            <AlertCircle className="w-12 h-12 text-orange-500 animate-pulse" />
                            <Clock className="w-12 h-12 text-amber-500 animate-tick" />
                          </div>
                          
                          <h3 className="text-3xl md:text-4xl font-bold text-orange-800 mb-4 animate-fadeInScale">
                            المسابقة لم تبدأ بعد
                          </h3>
                          
                          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-orange-100">
                            <p className="text-lg md:text-xl text-orange-700 leading-relaxed mb-4">
                              نتائج المسابقة ستكون متاحة فور انتهاء التصحيح
                            </p>
                            <p className="text-orange-600 font-semibold">
                              ترقبوا بدء المسابقة قريباً إن شاء الله
                            </p>
                          </div>
                          
                          <div className="text-center">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 px-6 py-3 rounded-full border border-amber-200">
                              <Clock className="w-5 h-5 text-amber-600 animate-tick" />
                              <span className="text-amber-800 font-semibold">ترقبوا بدء المسابقة قريباً إن شاء الله</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
              
              <StatsSection stats={stats} />
              <AllResultsSection students={rankedStudents} />
            </>
          ) : (
            <ExamSchedule />
          )}
          
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;