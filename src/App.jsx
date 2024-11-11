import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import QuizList from './components/Quiz/QuizList';
import QuizPage from './components/Quiz/QuizPage';
import { fetchQuizzes } from "../src/features/Quiz/quizzesSlice";

function App() {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.quizzes.status);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme.theme);
  }, [theme]);


  // Fetch quizzes on component mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchQuizzes());
    }
  }, [dispatch, status]);

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
          <Route path="/quizlist" element={<QuizList />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
