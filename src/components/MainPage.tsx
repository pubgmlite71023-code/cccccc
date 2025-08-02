import React, { useEffect, useRef } from 'react';
import { BookOpen, Star, Sparkles, Calendar, Trophy, Users, ArrowLeft, Fuel as Mosque } from 'lucide-react';

interface MainPageProps {
  onNavigate: (page: 'main' | 'results' | 'schedule') => void;
}

export const MainPage: React.FC<MainPageProps> = ({ onNavigate }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Try to play the audio when component mounts
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
        } catch (error) {
          console.log('Audio autoplay prevented by browser');
        }
      }
    };

    playAudio();

    // Cleanup function to pause audio when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Audio */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        style={{ display: 'none' }}
      >
        <source src="https://www.youtube.com/watch?v=40l3DfPUYkM" type="audio/mpeg" />
        {/* Fallback for browsers that don't support the audio element */}
      </audio>

      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Quran books */}
        <div className="floating-quran absolute top-20 left-10 text-yellow-300 opacity-30">
          <BookOpen className="w-16 h-16 transform rotate-12" />
        </div>
        <div className="floating-quran absolute top-40 right-20 text-white opacity-20" style={{ animationDelay: '1s' }}>
          <BookOpen className="w-12 h-12 transform -rotate-12" />
        </div>
        <div className="floating-quran absolute bottom-32 left-1/4 text-yellow-200 opacity-25" style={{ animationDelay: '2s' }}>
          <BookOpen className="w-20 h-20 transform rotate-6" />
        </div>
        <div className="floating-quran absolute bottom-20 right-1/3 text-white opacity-15" style={{ animationDelay: '0.5s' }}>
          <BookOpen className="w-14 h-14 transform -rotate-6" />
        </div>
        
        {/* Sparkles */}
        <div className="floating-sparkle absolute top-16 right-16 text-yellow-300 opacity-70">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="floating-sparkle absolute top-60 left-32 text-white opacity-50" style={{ animationDelay: '1.5s' }}>
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="floating-sparkle absolute bottom-40 right-20 text-yellow-200 opacity-60" style={{ animationDelay: '2.5s' }}>
          <Sparkles className="w-10 h-10" />
        </div>
        
        {/* Stars */}
        <div className="floating-star absolute top-32 left-1/2 text-yellow-300 opacity-40">
          <Star className="w-6 h-6" />
        </div>
        <div className="floating-star absolute bottom-60 left-20 text-white opacity-30" style={{ animationDelay: '1s' }}>
          <Star className="w-8 h-8" />
        </div>
        <div className="floating-star absolute top-80 right-40 text-yellow-200 opacity-35" style={{ animationDelay: '2s' }}>
          <Star className="w-5 h-5" />
        </div>

        {/* Radial light beams */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="radial-beam w-96 h-96 rounded-full bg-gradient-radial from-yellow-300/20 via-white/10 to-transparent animate-pulse-soft"></div>
        </div>
        <div className="absolute top-1/3 right-1/4 transform translate-x-1/2">
          <div className="radial-beam w-64 h-64 rounded-full bg-gradient-radial from-blue-300/15 via-purple-300/10 to-transparent animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col justify-center">
        {/* Header section */}
        <div className="text-center mb-16 animate-slideInDown">
          <div className="flex justify-center items-center gap-4 mb-6">
            <Mosque className="w-16 h-16 text-yellow-300 animate-bounce-slow mosque-glow" />
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 glowing-text-main">
                ترقبوا
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-yellow-300 to-white mx-auto rounded-full animate-pulse-glow"></div>
            </div>
            <Mosque className="w-16 h-16 text-yellow-300 animate-bounce-slow mosque-glow" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-yellow-300 mb-4 animate-slideInUp gradient-text-golden">
            بدء مسابقة المولد النبوي الشريف
          </h2>
          
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 animate-slideInUp glowing-text" style={{ animationDelay: '0.2s' }}>
            مسابقه المولد النبوي الشريف بالجامع الشرقي
          </h3>
          
          <div className="flex justify-center items-center gap-3 mb-6 animate-fadeInScale">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-yellow-300"></div>
            <p className="text-xl md:text-2xl text-blue-100 font-semibold">
              بالجامع الشرقي - دمليج
            </p>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-yellow-300"></div>
          </div>
        </div>

        {/* Welcome message */}
        <div className="max-w-4xl mx-auto text-center mb-16 animate-slideInUp" style={{ animationDelay: '0.3s' }}>
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-yellow-300 to-orange-300 p-4 rounded-full">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              أهلاً وسهلاً بكم في موقع مسابقة القرآن الكريم
            </h3>
            
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-6">
              نرحب بجميع الطلاب والطالبات من مختلف المراحل العمرية للمشاركة في مسابقة المولد النبوي الشريف
              لحفظ وتلاوة القرآن الكريم. هذه المسابقة تهدف إلى تشجيع الشباب على التقرب من كتاب الله العزيز
              وتعلم تعاليم ديننا الحنيف.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <Trophy className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">جوائز قيمة</h4>
                <p className="text-blue-200 text-sm">للفائزين في جميع المراحل</p>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <Users className="w-8 h-8 text-green-300 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">مشاركة واسعة</h4>
                <p className="text-blue-200 text-sm">من جميع الأعمار والمستويات</p>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <Star className="w-8 h-8 text-purple-300 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">تقييم عادل</h4>
                <p className="text-blue-200 text-sm">من لجنة محكمين خارج القرية</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fadeInScale" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={() => onNavigate('results')}
            className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            <div className="flex items-center justify-center gap-3">
              <Trophy className="w-6 h-6 group-hover:animate-bounce" />
              <span>عرض النتائج</span>
              <ArrowLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
          
          <button
            onClick={() => onNavigate('schedule')}
            className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            <div className="flex items-center justify-center gap-3">
              <Calendar className="w-6 h-6 group-hover:animate-bounce" />
              <span>جدول الاختبارات</span>
              <ArrowLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        {/* Footer message */}
        <div className="text-center mt-16 animate-fadeInScale" style={{ animationDelay: '0.9s' }}>
          {/* Contact section */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-8 border border-white/20 shadow-2xl max-w-2xl mx-auto">
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-yellow-300 to-orange-300 p-3 rounded-full animate-pulse-soft">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white glowing-text">
                تواصل معنا
              </h3>
              <div className="bg-gradient-to-r from-blue-300 to-purple-300 p-3 rounded-full animate-pulse-soft" style={{ animationDelay: '0.5s' }}>
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
            </div>
            
            <div className="space-y-4 text-center">
              <div className="flex items-center justify-center gap-3 bg-white/5 rounded-2xl p-4 hover-glow">
                <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <a href="mailto:tarekaboya2019@gmail.com" className="text-blue-100 hover:text-white transition-colors font-semibold">
                  tarekaboya2019@gmail.com
                </a>
              </div>
              
              <div className="flex items-center justify-center gap-3 bg-white/5 rounded-2xl p-4 hover-glow">
                <svg className="w-6 h-6 text-green-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <a href="tel:+01559181558" className="text-blue-100 hover:text-white transition-colors font-semibold">
                  +20 155 918 1558
                </a>
              </div>
              
              <div className="flex items-center justify-center gap-3 bg-white/5 rounded-2xl p-4 hover-glow">
                <svg className="w-6 h-6 text-green-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <a href="tel:+201205362040" className="text-blue-100 hover:text-white transition-colors font-semibold">
                  +20 122 053 6204
                </a>
              </div>
              
              <div className="flex items-center justify-center gap-3 bg-white/5 rounded-2xl p-4 hover-glow">
                <svg className="w-6 h-6 text-green-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <a href="tel:+201276099675" className="text-blue-100 hover:text-white transition-colors font-semibold">
                  +20 127 609 9675
                </a>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex items-center justify-center gap-2 text-blue-200">
                <svg className="w-5 h-5 text-pink-300 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span className="text-sm">Created by</span>
                <a 
                  href="https://www.facebook.com/palestine7102023y/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-bold text-yellow-300 hover:text-white transition-colors hover:underline glowing-text"
                >
                  Ahmed Tareq
                </a>
              </div>
            </div>
          </div>
          
          <p className="text-blue-200 text-lg">
            "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا"
          </p>
          <p className="text-blue-300 text-sm mt-2">
            صدق الله العظيم - سورة المزمل
          </p>
        </div>
      </div>
    </div>
  );
};
