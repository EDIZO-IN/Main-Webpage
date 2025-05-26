import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import Internships from './pages/Internships';
import InternshipDetails from './pages/InternshipDetails';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Contact from './pages/Contact';
// import Support from './pages/Support'; // Optional
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:id" element={<ServiceDetails />} />
          <Route path="internships" element={<Internships />} />
          <Route path="internships/:id" element={<InternshipDetails />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="contact" element={<Contact />} />
          {/* <Route path="support" element={<Support />} /> */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default App;
