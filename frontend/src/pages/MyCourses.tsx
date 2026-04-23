import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { courseService } from '../services/courseService';
import { Course } from '../types';
import CourseCard from '../components/CourseCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { BookOpen, GraduationCap, ArrowRight } from 'lucide-react';

const MyCourses: React.FC = () => {
  const { user, enrollments } = useAuth();
  const navigate = useNavigate();
  const [teacherCourses, setTeacherCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const canManageCourses = user?.role === 'teacher' || user?.role === 'admin';

  const loadCourses = useCallback(async () => {
    try {
      if (canManageCourses && user) {
        const response = await courseService.getAll({ teacher: user._id, limit: 50 });
        setTeacherCourses(response.courses);
      }
    } catch (error) {
      console.error('Failed to load courses:', error);
    } finally {
      setLoading(false);
    }
  }, [canManageCourses, user]);

  useEffect(() => {
    void loadCourses();
  }, [loadCourses]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const isStudent = !canManageCourses;
  const courses = isStudent
    ? enrollments.map((e) => e.course as Course).filter(Boolean)
    : teacherCourses;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <GraduationCap className="w-8 h-8 text-primary-500" />
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary-600">Learning Center</p>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">
            My Courses
          </h1>
          <p className="text-primary-500 mt-2 font-medium">
            {isStudent
              ? `Integrated with ${courses.length} active curriculum${courses.length !== 1 ? 's' : ''}.`
              : `Managing ${courses.length} educational asset${courses.length !== 1 ? 's' : ''}.`}
          </p>
        </div>
        {!isStudent && (
          <button
            onClick={() => navigate('/create-course')}
            className="btn-primary gap-2 h-12 px-8 shadow-xl shadow-primary-500/10"
          >
            Create Course <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {courses.length === 0 ? (
        <div className="widget-panel p-20 text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-20 h-20 bg-[#1d1d20] rounded-[32px] flex items-center justify-center mb-6 border border-[#27272a] shadow-inner">
            {isStudent ? (
              <GraduationCap className="w-10 h-10 text-primary-700" />
            ) : (
              <BookOpen className="w-10 h-10 text-primary-700" />
            )}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            Workspace Empty
          </h3>
          <p className="text-primary-500 max-w-sm mb-8 font-medium">
            {isStudent
              ? 'Discover new specialized courses in the catalog to begin your certification path.'
              : 'Initialize your first educational program to start publishing content.'}
          </p>
          <button
            onClick={() => navigate(isStudent ? '/courses' : '/create-course')}
            className="btn-secondary h-12 px-10"
          >
            {isStudent ? 'Explore Catalog' : 'Initialize Course'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
          {courses.map((course) => (
            <div key={course._id} className="flex h-full">
              <CourseCard course={course} isEnrolled={isStudent} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
