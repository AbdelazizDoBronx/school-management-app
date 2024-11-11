import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import NotFound from './pages/NotFound';
import Document from './pages/Document';
import Schedule from './pages/Schedule';
import Dashboard from './pages/Dashboard';
import DocumentRequest from './pages/Documents';
import StudentReport from './pages/Report';

function App() {
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme.theme);
  }, [theme]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/request-document" element={<DocumentRequest />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/reports" element={<StudentReport />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/documents" element={<Document />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
