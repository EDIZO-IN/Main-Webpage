import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  // Effect to immediately redirect to the homepage
  useEffect(() => {
    navigate('/'); // Navigate to the homepage immediately
  }, [navigate]); // Re-run effect if navigate function changes (though it's stable)

  // This component will now only briefly flash before redirecting.
  // The UI below will be rendered, but the redirect will happen very quickly.
  return (
    <div className="min-h-screen bg-edizo-gray-100 flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1 }} // Reduced transition duration for quicker appearance before redirect
        className="text-center max-w-md"
      >
        <h1 className="text-9xl font-bold text-edizo-red mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
        <p className="text-edizo-gray-700 mb-8">
          The page you are looking for doesn't exist or has been moved. You are being redirected to the homepage.
        </p>
        {/* The buttons below will be present in the DOM but the redirect will be near-instant */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            variant="primary"
            to="/"
            className="flex items-center justify-center"
          >
            <Home className="mr-2" size={18} /> Go to Homepage
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center justify-center"
          >
            <ArrowLeft className="mr-2" size={18} /> Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
