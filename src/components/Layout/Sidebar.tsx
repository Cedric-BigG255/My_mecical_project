import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Pill,
  MapPin,
  ShoppingCart,
  CreditCard,
  User,
  BookOpen,
  Users,
  UserCheck,
  Package,
  BarChart3,
  Settings,
  Stethoscope,
  Building2,
  Shield,
  Clock,
  Heart,
  Activity,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const getNavItems = () => {
    switch (user?.role) {
      case 'patient':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/patient/dashboard' },
          { icon: BookOpen, label: 'Health Articles', path: '/patient/articles' },
          { icon: FileText, label: 'My Prescriptions', path: '/patient/prescriptions' },
          { icon: MapPin, label: 'Find Pharmacies', path: '/patient/pharmacies' },
          { icon: ShoppingCart, label: 'My Orders', path: '/patient/orders' },
          { icon: CreditCard, label: 'Insurance & Claims', path: '/patient/insurance' },
          { icon: User, label: 'Profile & History', path: '/patient/profile' },
        ];
      
      case 'doctor':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/doctor/dashboard' },
          { icon: Users, label: 'My Patients', path: '/doctor/patients' },
          { icon: FileText, label: 'My Prescriptions', path: '/doctor/my-prescriptions' },
          { icon: UserCheck, label: 'Register Patient', path: '/doctor/register-patient' },
          { icon: Activity, label: 'Patient History', path: '/doctor/patient-history' },
          { icon: Stethoscope, label: 'E-Prescription Tool', path: '/doctor/e-prescription' },
          { icon: User, label: 'Profile', path: '/doctor/profile' },
        ];
      
      case 'pharmacist':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/pharmacist/dashboard' },
          { icon: FileText, label: 'Prescriptions', path: '/pharmacist/prescriptions' },
          { icon: ShoppingCart, label: 'Orders', path: '/pharmacist/orders' },
          { icon: Package, label: 'Inventory', path: '/pharmacist/inventory' },
          { icon: Pill, label: 'Medicines', path: '/pharmacist/medicines' },
          { icon: CreditCard, label: 'Insurance Claims', path: '/pharmacist/insurance-claims' },
          { icon: BarChart3, label: 'Reports', path: '/pharmacist/reports' },
          { icon: UserCheck, label: 'Register User', path: '/pharmacist/register-user' },
          { icon: User, label: 'Profile', path: '/pharmacist/profile' },
        ];
      
      case 'admin':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
          { icon: Users, label: 'User Management', path: '/admin/users' },
          { icon: UserCheck, label: 'Register User', path: '/admin/register' },
          { icon: BookOpen, label: 'Health Articles', path: '/admin/articles' },
          { icon: Building2, label: 'Pharmacy Management', path: '/admin/pharmacy-management' },
          { icon: BarChart3, label: 'System Analytics', path: '/admin/analytics' },
          { icon: Activity, label: 'System Activity', path: '/admin/activity' },
          { icon: Settings, label: 'System Settings', path: '/admin/settings' },
        ];
      
      case 'insurer':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/insurer/dashboard' },
          { icon: Building2, label: 'Pharmacy Management', path: '/insurer/pharmacies' },
          { icon: FileText, label: 'Claims Processing', path: '/insurer/claims' },
          { icon: BarChart3, label: 'Reports & Analytics', path: '/insurer/reports' },
          { icon: TrendingUp, label: 'Financial Overview', path: '/insurer/financial' },
          { icon: Shield, label: 'Fraud Detection', path: '/insurer/fraud' },
          { icon: Users, label: 'Member Management', path: '/insurer/members' },
          { icon: Settings, label: 'Settings', path: '/insurer/settings' },
        ];
      
      default:
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="bg-white border-r border-gray-200 w-64 min-h-screen fixed left-0 top-0 z-10">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-medical-600 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">MediFlow</h2>
            <p className="text-xs text-gray-500">Digital Healthcare Platform</p>
          </div>
        </div>
      </div>

      <nav className="px-4 pb-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-medical-50 text-medical-700 border-r-2 border-medical-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Role Badge */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
            {user?.role === 'admin' && <Shield className="w-4 h-4 text-white" />}
            {user?.role === 'doctor' && <Stethoscope className="w-4 h-4 text-white" />}
            {user?.role === 'pharmacist' && <Pill className="w-4 h-4 text-white" />}
            {user?.role === 'patient' && <User className="w-4 h-4 text-white" />}
            {user?.role === 'insurer' && <Building2 className="w-4 h-4 text-white" />}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;