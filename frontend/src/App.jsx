import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EventsPage from './pages/EventsPage';
import JobsPage from './pages/JobsPage';
import MentorshipPage from './pages/MentorshipPage';
import DonationsPage from './pages/DonationsPage';
import PrivateRoute from './components/routes/PrivateRoute';
import RestrictedRoute from './components/routes/RestrictedRoutes';
import RegisterPage from './pages/RegisterPage';
import AdminRoute from './components/routes/AdminRoute';
import UnauthorizedPage from './pages/UnauthorizedPage';
import './index.css'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* Public Routes */}
                <Route index element={<HomePage />} />

                {/* Restricted Routes (only for non-authenticated users) */}
                <Route element={<RestrictedRoute />}>
                  <Route path="login" element={<LoginPage />} />
                  <Route path="register" element={<RegisterPage />} />
                </Route>

                {/* Private Routes (for authenticated users) */}
                <Route element={<PrivateRoute />}>
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="events" element={<EventsPage />} />
                  <Route path="jobs" element={<JobsPage />} />
                  <Route path="mentorship" element={<MentorshipPage />} />
                  <Route path="donations" element={<DonationsPage />} />
                </Route>

                {/* Admin-only Routes */}
                <Route element={<AdminRoute />}>
                  <Route path="admin" element={<DashboardPage />} />
                </Route>

                {/* Error Routes */}
                <Route path="unauthorized" element={<UnauthorizedPage />} />
                {/* <Route path="*" element={<NotFoundPage />} /> */}
              </Route>
            </Routes>
          </AnimatePresence>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;