import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CommunicationMethodManagement from './components/Admin/CommunicationMethodManagement';
import CompanyManagement from './components/Admin/CompanyManagement';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';
import CalendarView from './components/User/CalendarView';
import Dashboard from './components/User/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute role="user" component={Dashboard} />}
        />
        <Route
          path="/calendar"
          element={<ProtectedRoute role="user" component={CalendarView} />}
        />
        <Route
          path="/admin/companies"
          element={<ProtectedRoute role="admin" component={CompanyManagement} />}
        />
        <Route
          path="/admin/communication-methods"
          element={<ProtectedRoute role="admin" component={CommunicationMethodManagement} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
