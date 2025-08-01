import React, { useState } from 'react';
import { Search, User, Hash, Clock, AlertCircle, Calendar, BookOpen } from 'lucide-react';
import { Student } from '../types';

interface SearchSectionProps {
  students: Student[];
  onResult: (student: Student | null) => void;
}

export const SearchSection: React.FC<SearchSectionProps> = ({ students, onResult }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'id'>('name');
  const [contestStarted] = useState(false); // المسابقة لم تبدأ بعد

  const handleSearch = () => {
    if (!contestStarted) {
      onResult(null);
      return;
    }
    
    if (!searchTerm.trim()) {
      onResult(null);
      return;
    }

    const student = students.find(s => {
      if (searchType === 'name') {
        return s.name.toLowerCase().includes(searchTerm.toLowerCase().trim());
      } else {
        return s.id.toString() === searchTerm.trim();
      }
    });

    onResult(student || null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="bg-white py-12 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            البحث عن النتيجة
          </h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl shadow-md">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="flex rounded-lg overflow-hidden border-2 border-gray-200 focus-within:border-blue-500 transition-colors">
                  <div className="bg-gray-50 px-4 py-3 flex items-center">
                    {searchType === 'name' ? <User className="w-5 h-5 text-gray-500" /> : <Hash className="w-5 h-5 text-gray-500" />}
                  </div>
                  <input
                    type={searchType === 'id' ? 'number' : 'text'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={searchType === 'name' ? 'ادخل اسم الطالب...' : 'ادخل رقم الطالب...'}
                    className="flex-1 px-4 py-3 text-right focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    disabled={!contestStarted}
                    dir="rtl"
                  />
                </div>
              </div>
              
              <button
                onClick={handleSearch}
                className={`px-8 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold transform hover:scale-105 ${
                  contestStarted 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:shadow-blue-500/25' 
                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                }`}
                disabled={!contestStarted}
              >
                <Search className="w-5 h-5" />
                بحث
              </button>
            </div>
            
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setSearchType('name')}
                className={`px-4 py-2 rounded-full transition-all duration-200 ${
                  searchType === 'name' && contestStarted
                    ? 'bg-blue-600 text-white' 
                    : contestStarted
                    ? 'bg-white text-blue-600 hover:bg-blue-50'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!contestStarted}
              >
                البحث بالاسم
              </button>
              <button
                onClick={() => setSearchType('id')}
                className={`px-4 py-2 rounded-full transition-all duration-200 ${
                  searchType === 'id' && contestStarted
                    ? 'bg-blue-600 text-white' 
                    : contestStarted
                    ? 'bg-white text-blue-600 hover:bg-blue-50'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!contestStarted}
              >
                البحث برقم الطالب
              </button>
            </div>
            
            {!contestStarted && (
              <div className="mt-6 bg-gradient-to-r from-orange-100 to-yellow-100 border-2 border-orange-200 rounded-xl p-4">
                <div className="flex items-center justify-center gap-2 text-orange-700">
                  <Clock className="w-5 h-5 animate-tick" />
                  <span className="font-semibold">ترقبوا بدء المسابقة قريباً إن شاء الله</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};