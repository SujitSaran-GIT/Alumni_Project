import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import StudentDashboard from './pages/StudentDashboard';
import AlumniDashboard from './pages/AlumniDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Mentorship from './pages/Mentorship';
import Jobs from './pages/Jobs';
import Event from './pages/Event';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/common/PrivateRoute';
import AuthPage from './pages/AuthPage';
import Layout from './components/Layout';

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/student-dashboard"
              element={
                <PrivateRoute>
                  <StudentDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/alumni-dashboard"
              element={
                <PrivateRoute>
                  <AlumniDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/mentorship"
              element={
                <PrivateRoute>
                  <Mentorship />
                </PrivateRoute>
              }
            />
            <Route
              path="/jobs"
              element={
                <PrivateRoute>
                  <Jobs />
                </PrivateRoute>
              }
            />
            <Route
              path="/events"
              element={
                <PrivateRoute>
                  <Event />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;