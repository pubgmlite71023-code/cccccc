import React, { useState } from 'react';
import { Student } from '../types';
import { ChevronDown, ChevronUp, List, Filter, Clock, Calendar, AlertCircle } from 'lucide-react';
import { getCategoryColor, getGradeColor } from '../utils/contestStats';

interface AllResultsSectionProps {
  students: Student[];
}

export const AllResultsSection: React.FC<AllResultsSectionProps> = ({ students }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [contestStarted] = useState(false); // المسابقة لم تبدأ بعد
  
  const categories = [...new Set(students.map(s => s.category))];
  const filteredStudents = selectedCategory === 'all' 
    ? students 
    : students.filter(s => s.category === selectedCategory);

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-3 mx-auto font-semibold text-lg transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
          >
            <List className="w-6 h-6 group-hover:animate-bounce" />
            عرض جميع النتائج
            {isExpanded ? <ChevronUp className="w-5 h-5 group-hover:animate-bounce" /> : <ChevronDown className="w-5 h-5 group-hover:animate-bounce" />}
          </button>
        </div>

        {isExpanded && (
          <div className="animate-fadeIn">
            {!contestStarted ? (
              /* Contest not started message */
              <div className="max-w-2xl mx-auto">
                <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 border-2 border-orange-200 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                  {/* Background decorative elements */}
                  <div className="absolute top-4 right-4 text-orange-200 opacity-30">
                    <Clock className="w-16 h-16 animate-spin-slow" />
                  </div>
                  <div className="absolute bottom-4 left-4 text-yellow-200 opacity-20">
                    <Calendar className="w-12 h-12 animate-bounce-slow" />
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
                        نحن نعمل بجد لإعداد كل شيء لمسابقة المولد النبوي الشريف
                      </p>
                      <p className="text-orange-600 font-semibold">
                        ترقبوا بدء المسابقة قريباً إن شاء الله
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-xl border border-blue-200">
                        <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2 animate-bounce-slow" />
                        <h4 className="font-bold text-blue-800 mb-1">تابع الجدول</h4>
                        <p className="text-blue-700 text-sm">راجع مواعيد الاختبارات</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-xl border border-green-200">
                        <AlertCircle className="w-8 h-8 text-green-600 mx-auto mb-2 animate-pulse" />
                        <h4 className="font-bold text-green-800 mb-1">استعد للمسابقة</h4>
                        <p className="text-green-700 text-sm">احفظ الأجزاء المطلوبة</p>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 px-6 py-3 rounded-full border border-amber-200">
                        <Clock className="w-5 h-5 text-amber-600 animate-tick" />
                        <span className="text-amber-800 font-semibold">سيتم الإعلان عن النتائج فور انتهاء التصحيح</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Filter section */}
                <div className="bg-gray-50 p-6 rounded-xl mb-8">
                  <div className="flex items-center gap-4 justify-center flex-wrap">
                    <Filter className="w-5 h-5 text-gray-600" />
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`px-4 py-2 rounded-full transition-all ${
                        selectedCategory === 'all' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      جميع الفئات
                    </button>
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full transition-all ${
                          selectedCategory === category 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Results table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        <tr>
                          <th className="px-6 py-4 text-center">الترتيب</th>
                          <th className="px-6 py-4 text-center">الاسم</th>
                          <th className="px-6 py-4 text-center">رقم الطالب</th>
                          <th className="px-6 py-4 text-center">الفئة</th>
                          <th className="px-6 py-4 text-center">الدرجة</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredStudents.slice(0, 50).map((student, index) => (
                          <tr key={student.id} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-center">
                              <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                                student.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                                student.rank === 2 ? 'bg-gray-100 text-gray-800' :
                                student.rank === 3 ? 'bg-amber-100 text-amber-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {student.rank}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center font-semibold text-gray-800">
                              {student.name}
                            </td>
                            <td className="px-6 py-4 text-center text-gray-600">
                              {student.id}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(student.category)}`}>
                                {student.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`inline-block px-3 py-1 rounded-lg font-bold text-lg ${getGradeColor(student.grade)}`}>
                                {student.grade}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {filteredStudents.length > 50 && (
                    <div className="bg-gray-50 p-4 text-center text-gray-600">
                      عرض أول 50 نتيجة من أصل {filteredStudents.length} نتيجة
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};