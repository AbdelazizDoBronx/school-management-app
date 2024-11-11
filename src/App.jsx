import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import NotFound from './pages/NotFound';
import Document from './pages/Document';

function App() {
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme.theme);
  }, [theme]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/documents" element={<Document />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
