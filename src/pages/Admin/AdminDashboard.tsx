import React from 'react';
import AdminLayout from '../../components/Layout/AdminLayout';
import { 
  Users, 
  FileText, 
  Building2, 
  BarChart3,
  TrendingUp,
  Shield,
  Activity,
  BookOpen,
  UserCheck,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Heart
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = {
    totalUsers: 2847,
    newUsersToday: 23,
    totalDoctors: 156,
    totalPatients: 2234,
    totalPharmacists: 89,
    totalInsurers: 12,
    totalPharmacies: 145,
    totalArticles: 234,
    publishedArticles: 198,
    pendingArticles: 12,
    systemUptime: 99.9
  };

  const recentActivity = [
    {
      id: '1',
      type: 'user_registration',
      message: 'New doctor registered: Dr. Emily Johnson',
      time: '2 hours ago',
      status: 'pending',
      icon: UserCheck,
      color: 'text-blue-600'
    },
    {
      id: '2',
      type: 'pharmacy_verification',
      message: 'Pharmacy verification completed: MediCare Plus',
      time: '4 hours ago',
      status: 'completed',
      icon: Building2,
      color: 'text-green-600'
    },
    {
      id: '3',
      type: 'article_submission',
      message: 'New article submitted for review',
      time: '6 hours ago',
      status: 'pending',
      icon: BookOpen,
      color: 'text-orange-600'
    },
    {
      id: '4',
      type: 'system_alert',
      message: 'High user registration volume detected',
      time: '8 hours ago',
      status: 'info',
      icon: AlertCircle,
      color: 'text-yellow-600'
    }
  ];

  const quickActions = [
    {
      title: 'Register New User',
      description: 'Add doctors, patients, or staff',
      icon: UserCheck,
      color: 'bg-blue-500',
      action: '/admin/users/new'
    },
    {
      title: 'Approve Registrations',
      description: 'Review pending applications',
      icon: CheckCircle,
      color: 'bg-green-500',
      action: '/admin/approvals'
    },
    {
      title: 'Publish Article',
      description: 'Create health content',
      icon: BookOpen,
      color: 'bg-purple-500',
      action: '/admin/articles/new'
    },
    {
      title: 'Add Pharmacy',
      description: 'Register new pharmacy',
      icon: Building2,
      color: 'bg-orange-500',
      action: '/admin/pharmacies/new'
    }
  ];

  return (
    <AdminLayout title="Dashboard Overview">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-medical-600 to-blue-600 rounded-xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome back, Administrator</h2>
          <p className="text-medical-100">
            Here's what's happening with your healthcare platform today
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">+{stats.newUsersToday} today</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pharmacies</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalPharmacies}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">+12 this month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published Articles</p>
                <p className="text-3xl font-bold text-gray-900">{stats.publishedArticles}</p>
                <div className="flex items-center mt-2">
                  <Clock className="w-4 h-4 text-orange-500 mr-1" />
                  <span className="text-sm text-orange-600 font-medium">{stats.pendingArticles} pending</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Uptime</p>
                <p className="text-3xl font-bold text-gray-900">{stats.systemUptime}%</p>
                <div className="flex items-center mt-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">Healthy</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* User Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Doctors</h3>
              <UserCheck className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.totalDoctors}</p>
            <p className="text-sm text-gray-500 mt-1">Verified professionals</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Patients</h3>
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.totalPatients.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">Active users</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Pharmacists</h3>
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.totalPharmacists}</p>
            <p className="text-sm text-gray-500 mt-1">Licensed pharmacists</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Insurers</h3>
              <Building2 className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.totalInsurers}</p>
            <p className="text-sm text-gray-500 mt-1">Partner companies</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  <button className="text-medical-600 hover:text-medical-700 text-sm font-medium">
                    View All
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.status === 'completed' ? 'bg-green-100' :
                        activity.status === 'pending' ? 'bg-yellow-100' : 'bg-blue-100'
                      }`}>
                        <activity.icon className={`w-5 h-5 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                        activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                      <action.icon className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="font-medium text-gray-900 text-sm">{action.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Activity className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">{stats.systemUptime}%</p>
              <p className="text-sm text-gray-500">System Uptime</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">1,247</p>
              <p className="text-sm text-gray-500">Active Sessions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-purple-600">245ms</p>
              <p className="text-sm text-gray-500">Response Time</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-orange-600">99.8%</p>
              <p className="text-sm text-gray-500">Security Score</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;