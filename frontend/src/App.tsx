// App.tsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts
import MainLayout from './layouts/MainLayout'; // Assuming this exists and is correct

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import Internships from './pages/Internships';
import InternshipDetails from './pages/InternshipDetails';
import Contact from './pages/Contact';
// import Support from './pages/Support'; // Commented out as in original
import NotFound from './pages/NotFound';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails'; // Corrected component name

const App: React.FC = () => {
  const location = useLocation(); // Get the location object

  return (
    // AnimatePresence needs to wrap the component that changes,
    // which is effectively the content rendered by the <Routes>.
    // Providing location and a key to Routes helps AnimatePresence
    // detect route changes properly.
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainLayout />}>
          {/* This index route ensures Home is rendered by default when the path is exactly "/" */}
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:id" element={<ServiceDetails />} />
          <Route path="internships" element={<Internships />} />
          <Route path="internships/:id" element={<InternshipDetails />} />
          <Route path="projects" element={<Projects />} />
          {/* Corrected typo in component name */}
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="contact" element={<Contact />} />
          {/* <Route path="support" element={<Support />} /> */} {/* Commented out as in original */}
          {/* Wildcard route for 404, should be last within this <Routes> context to ensure other routes are matched first */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default App;
