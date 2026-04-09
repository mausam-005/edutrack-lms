import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, LayoutList } from 'lucide-react';
import { Course } from '../types';
interface CourseCardProps {
  course: Course;
  isEnrolled?: boolean;
}
const CourseCard: React.FC<CourseCardProps> = ({ course, isEnrolled }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/courses/${course._id}`)}
      className="widget-panel flex flex-col group cursor-pointer h-full"
    >
      {}
      <div className="relative h-32 overflow-hidden border-b border-[#27272a] bg-[#1d1d20]">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#27272a] to-[#111111] flex items-center justify-center text-[#3f3f46]">
            <LayoutList className="w-8 h-8" />
          </div>
        )}
        {}
        <div className="absolute top-3 left-3 flex gap-2">
          {isEnrolled && (
            <div className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold bg-green-500/20 text-green-400 border border-green-500/30 backdrop-blur-md">
              Enrolled
            </div>
          )}
        </div>
      </div>
      {}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold tracking-wider text-primary-500 uppercase px-1.5 py-0.5 bg-[#1d1d20] rounded border border-[#27272a]">
            {course.category}
          </span>
        </div>
        <h3 className="text-base font-semibold text-white mb-1.5 line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
          {course.title}
        </h3>
        <p className="text-xs text-primary-400 line-clamp-2 mb-4 flex-1 font-normal leading-relaxed">
          {course.description}
        </p>
        {}
        <div className="flex items-center justify-between pt-3 border-t border-[#27272a] mt-auto">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-sm bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-primary-300 text-[10px] border border-white/5">
              {course.teacher?.name?.charAt(0) || 'T'}
            </div>
            <span className="text-[11px] font-medium text-primary-400 truncate max-w-[100px]">
              {course.teacher?.name || 'Unknown'}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-medium text-primary-500 bg-[#1d1d20] px-1.5 py-0.5 rounded border border-[#27272a]">
            <Users className="w-3 h-3" />
            <span>{course.enrollmentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseCard;
