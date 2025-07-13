import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './components/common/ToastContainer';

// Auth Components
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';

// Dashboard Pages
import PatientDashboard from './pages/Patient/PatientDashboard';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import PharmacistDashboard from './pages/Pharmacist/PharmacistDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import InsurerDashboard from './pages/Insurer/InsurerDashboard';

// Patient Pages
import HealthArticles from './pages/Patient/HealthArticles';
import MyPrescriptions from './pages/Patient/MyPrescriptions';
import FindPharmacies from './pages/Patient/FindPharmacies';

// Doctor Pages
import MyPatients from './pages/Doctor/MyPatients';
import EPrescription from './pages/Doctor/EPrescription';
import RegisterPatient from './pages/Doctor/RegisterPatient';

// Pharmacist Pages
import PrescriptionManagement from './pages/Pharmacist/PrescriptionManagement';
import InventoryManagement from './pages/Pharmacist/InventoryManagement';
import OrderManagement from './pages/Pharmacist/OrderManagement';
import InsuranceClaims from './pages/Pharmacist/InsuranceClaims';

// Admin Pages
import AdminArticles from './pages/Admin/AdminArticles';
import AdminUserManagement from './pages/Admin/AdminUserManagement';
import AdminSystemAnalytics from './pages/Admin/AdminSystemAnalytics';
import UserRegistration from './pages/Admin/UserRegistration';
import UserList from './pages/Admin/UserRegistration/UserList';
import PharmacyManagement from './pages/Admin/PharmacyManagement';
import HospitalManagement from './pages/Admin/HospitalManagement';
import MedicineManagement from './pages/Admin/MedicineManagement';

// Insurer Pages
import PharmacyManagementInsurer from './pages/Insurer/PharmacyManagement';
import ClaimsProcessing from './pages/Insurer/ClaimsProcessing';
import ReportsAnalytics from './pages/Insurer/ReportsAnalytics';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ 
  children, 
  allowedRoles 
}) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

// App Content Component
const AppContent: React.FC = () => {
  const { user } = useAuth();

  const getDashboardRoute = () => {
    if (!user) return '/login';
    
    switch (user.role) {
      case 'admin': return '/admin/dashboard';
      case 'doctor': return '/doctor/dashboard';
      case 'pharmacist': return '/pharmacist/dashboard';
      case 'patient': return '/patient/dashboard';
      case 'insurer': return '/insurer/dashboard';
      default: return '/login';
    }
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={user ? <Navigate to={getDashboardRoute()} replace /> : <LoginForm />} 
      />
      <Route 
        path="/register" 
        element={user ? <Navigate to={getDashboardRoute()} replace /> : <RegisterForm />} 
      />
      
      {/* Patient Routes */}
      <Route path="/patient/dashboard" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <PatientDashboard />
        </ProtectedRoute>
      } />
      <Route path="/patient/articles" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <HealthArticles />
        </ProtectedRoute>
      } />
      <Route path="/patient/prescriptions" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <MyPrescriptions />
        </ProtectedRoute>
      } />
      <Route path="/patient/pharmacies" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <FindPharmacies />
        </ProtectedRoute>
      } />
      
      {/* Doctor Routes */}
      <Route path="/doctor/dashboard" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <DoctorDashboard />
        </ProtectedRoute>
      } />
      <Route path="/doctor/patients" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <MyPatients />
        </ProtectedRoute>
      } />
      <Route path="/doctor/e-prescription" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <EPrescription />
        </ProtectedRoute>
      } />
      <Route path="/doctor/register-patient" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <RegisterPatient />
        </ProtectedRoute>
      } />
      
      {/* Pharmacist Routes */}
      <Route path="/pharmacist/dashboard" element={
        <ProtectedRoute allowedRoles={['pharmacist']}>
          <PharmacistDashboard />
        </ProtectedRoute>
      } />
      <Route path="/pharmacist/prescriptions" element={
        <ProtectedRoute allowedRoles={['pharmacist']}>
          <PrescriptionManagement />
        </ProtectedRoute>
      } />
      <Route path="/pharmacist/inventory" element={
        <ProtectedRoute allowedRoles={['pharmacist']}>
          <InventoryManagement />
        </ProtectedRoute>
      } />
      <Route path="/pharmacist/orders" element={
        <ProtectedRoute allowedRoles={['pharmacist']}>
          <OrderManagement />
        </ProtectedRoute>
      } />
      <Route path="/pharmacist/insurance-claims" element={
        <ProtectedRoute allowedRoles={['pharmacist']}>
          <InsuranceClaims />
        </ProtectedRoute>
      } />
      
      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/articles" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminArticles />
        </ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminUserManagement />
        </ProtectedRoute>
      } />
      <Route path="/admin/analytics" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminSystemAnalytics />
        </ProtectedRoute>
      } />
      <Route path="/admin/register" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <UserRegistration />
        </ProtectedRoute>
      } />
      <Route path="/admin/registered-users" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <UserList />
        </ProtectedRoute>
      } />
      <Route path="/admin/pharmacy-management" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <PharmacyManagement />
        </ProtectedRoute>
      } />
      <Route path="/admin/hospital-management" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <HospitalManagement />
        </ProtectedRoute>
      } />
      <Route path="/admin/medicine-management" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MedicineManagement />
        </ProtectedRoute>
      } />
      
      {/* Insurer Routes */}
      <Route path="/insurer/dashboard" element={
        <ProtectedRoute allowedRoles={['insurer']}>
          <InsurerDashboard />
        </ProtectedRoute>
      } />
      <Route path="/insurer/pharmacies" element={
        <ProtectedRoute allowedRoles={['insurer']}>
          <PharmacyManagementInsurer />
        </ProtectedRoute>
      } />
      <Route path="/insurer/claims" element={
        <ProtectedRoute allowedRoles={['insurer']}>
          <ClaimsProcessing />
        </ProtectedRoute>
      } />
      <Route path="/insurer/reports" element={
        <ProtectedRoute allowedRoles={['insurer']}>
          <ReportsAnalytics />
        </ProtectedRoute>
      } />
      
      {/* Generic Dashboard Route */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Navigate to={getDashboardRoute()} replace />
        </ProtectedRoute>
      } />
      
      {/* Default Redirects */}
      <Route path="/" element={
        user ? (
          <Navigate to={getDashboardRoute()} replace />
        ) : (
          <Navigate to="/login" replace />
        )
      } />
      <Route path="*" element={
        <Navigate to={user ? getDashboardRoute() : '/login'} replace />
      } />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <AppContent />
          </div>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;