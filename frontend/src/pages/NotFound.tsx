import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center page-container">
      <div className="text-center">
        <h1 className="text-8xl font-black gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-surface-500 dark:text-surface-400 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button onClick={() => navigate('/dashboard')} className="btn-primary gap-2">
          <Home className="w-5 h-5" />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFound;
