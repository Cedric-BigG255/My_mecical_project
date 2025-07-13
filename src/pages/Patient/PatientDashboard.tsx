import React from 'react';
import Layout from '../../components/Layout/Layout';
import StatsCard from '../../components/Dashboard/StatsCard';
import { 
  FileText, 
  ShoppingCart, 
  CreditCard, 
  Heart,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  BookOpen,
  MapPin,
  Bell
} from 'lucide-react';

const PatientDashboard: React.FC = () => {
  const stats = {
    activePrescriptions: 3,
    pendingOrders: 2,
    insuranceClaims: 5,
    healthScore: 85
  };

  const recentPrescriptions = [
    {
      id: '1',
      doctor: 'Dr. John Smith',
      medication: 'Amoxicillin 500mg',
      date: '2024-01-25',
      status: 'active',
      refills: 2
    },
    {
      id: '2',
      doctor: 'Dr. Sarah Johnson',
      medication: 'Lisinopril 10mg',
      date: '2024-01-20',
      status: 'active',
      refills: 5
    }
  ];

  const recentArticles = [
    {
      id: '1',
      title: 'Understanding Hypertension: Prevention and Management',
      category: 'Cardiovascular Health',
      readTime: '5 min read',
      publishedDate: '2024-01-25'
    },
    {
      id: '2',
      title: 'The Importance of Regular Health Checkups',
      category: 'Preventive Care',
      readTime: '3 min read',
      publishedDate: '2024-01-24'
    }
  ];

  const upcomingReminders = [
    {
      id: '1',
      type: 'medication',
      message: 'Take Amoxicillin - 2 tablets',
      time: '2:00 PM'
    },
    {
      id: '2',
      type: 'appointment',
      message: 'Follow-up with Dr. Smith',
      time: 'Tomorrow 10:00 AM'
    }
  ];

  return (
    <Layout title="Patient Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-medical-600 to-primary-600 rounded-xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome to Your Health Dashboard</h2>
          <p className="text-medical-100">
            Stay on top of your health with digital prescriptions and personalized care
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Active Prescriptions"
            value={stats.activePrescriptions}
            icon={FileText}
            color="medical"
          />
          <StatsCard
            title="Pending Orders"
            value={stats.pendingOrders}
            icon={ShoppingCart}
            color="warning"
          />
          <StatsCard
            title="Insurance Claims"
            value={stats.insuranceClaims}
            change="+2"
            changeType="positive"
            icon={CreditCard}
            color="success"
          />
          <StatsCard
            title="Health Score"
            value={`${stats.healthScore}%`}
            change="+5%"
            changeType="positive"
            icon={Heart}
            color="error"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Prescriptions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Prescriptions</h3>
                  <button className="text-medical-600 hover:text-medical-700 text-sm font-medium">
                    View All
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {recentPrescriptions.map((prescription) => (
                  <div key={prescription.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{prescription.medication}</p>
                            <p className="text-sm text-gray-500">Prescribed by {prescription.doctor}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-xs text-gray-500">
                                {new Date(prescription.date).toLocaleDateString()}
                              </span>
                              <span className="text-xs text-gray-500">
                                {prescription.refills} refills remaining
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-medical-600" />
                    <span className="font-medium">Find Nearby Pharmacies</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <ShoppingCart className="w-5 h-5 text-primary-600" />
                    <span className="font-medium">Order Medicines</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5 text-success-600" />
                    <span className="font-medium">Insurance Claims</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
              </div>
            </div>

            {/* Upcoming Reminders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Reminders</h3>
              <div className="space-y-3">
                {upcomingReminders.map((reminder) => (
                  <div key={reminder.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-medical-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{reminder.message}</p>
                      <p className="text-xs text-gray-500">{reminder.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Health Articles */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Latest Health Articles</h3>
              <button className="text-medical-600 hover:text-medical-700 text-sm font-medium">
                View All Articles
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {recentArticles.map((article) => (
              <div key={article.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start space-x-3">
                  <BookOpen className="w-5 h-5 text-medical-600 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-2">{article.title}</h4>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{article.category}</span>
                      <span>{article.readTime}</span>
                      <span>{new Date(article.publishedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientDashboard;