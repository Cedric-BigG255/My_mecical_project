import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  BookOpen,
  Shield,
  BarChart3,
  Settings,
  Stethoscope,
  UserCheck,
  FileText,
  Bell,
  MessageSquare,
  Download,
  ChevronDown,
  ChevronRight,
  Heart,
  Activity,
  HelpCircle,
  Pill
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar: React.FC = () => {
  const { user } = useAuth();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['users']);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin/dashboard',
      color: 'text-blue-600'
    },
    {
      id: 'users',
      label: 'User Management',
      icon: Users,
      color: 'text-purple-600',
      submenu: [
        { label: 'All Users', path: '/admin/registered-users', icon: Users },
        { label: 'Register User', path: '/admin/register', icon: UserCheck }
      ]
    },
    {
      id: 'facilities',
      label: 'Facility Management',
      icon: Building2,
      color: 'text-green-600',
      submenu: [
        { label: 'Hospitals', path: '/admin/hospital-management', icon: Building2 },
        { label: 'Pharmacies', path: '/admin/pharmacy-management', icon: Building2 },
        { label: 'Medicines', path: '/admin/medicine-management', icon: Pill }
      ]
    },
    {
      id: 'articles',
      label: 'Content Management',
      icon: BookOpen,
      color: 'text-orange-600',
      submenu: [
        { label: 'All Articles', path: '/admin/articles', icon: BookOpen },
        { label: 'Pending Review', path: '/admin/articles/pending', icon: FileText },
        { label: 'Published', path: '/admin/articles/published', icon: FileText }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics & Reports',
      icon: BarChart3,
      path: '/admin/analytics',
      color: 'text-indigo-600'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      path: '/admin/notifications',
      color: 'text-yellow-600'
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: MessageSquare,
      path: '/admin/messages',
      color: 'text-pink-600'
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: Download,
      path: '/admin/reports',
      color: 'text-teal-600'
    },
    {
      id: 'activity',
      label: 'System Activity',
      icon: Activity,
      path: '/admin/activity',
      color: 'text-red-600'
    },
    {
      id: 'support',
      label: 'Support Center',
      icon: HelpCircle,
      path: '/admin/support',
      color: 'text-gray-600'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/admin/settings',
      color: 'text-gray-600'
    }
  ];

  return (
    <aside className="bg-white border-r border-gray-200 w-64 min-h-screen fixed left-0 top-0 z-10 overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-medical-600 rounded-xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">MediFlow</h2>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.id)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {expandedMenus.includes(item.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  {expandedMenus.includes(item.id) && (
                    <ul className="mt-2 ml-6 space-y-1">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.path}>
                          <NavLink
                            to={subItem.path}
                            className={({ isActive }) =>
                              `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                                isActive
                                  ? 'bg-medical-50 text-medical-700 border-r-2 border-medical-700'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                              }`
                            }
                          >
                            <subItem.icon className="w-4 h-4" />
                            <span className="text-sm">{subItem.label}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <NavLink
                  to={item.path!}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-medical-50 text-medical-700 border-r-2 border-medical-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* User Info */}
      <div className="px-6 py-4 border-t border-gray-200 mt-auto">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">System Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;