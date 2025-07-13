import React from 'react';
import Layout from '../../components/Layout/Layout';
import StatsCard from '../../components/Dashboard/StatsCard';
import { 
  Users, 
  FileText, 
  Calendar, 
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  Stethoscope,
  UserPlus,
  TrendingUp
} from 'lucide-react';

const DoctorDashboard: React.FC = () => {
  const stats = {
    totalPatients: 156,
    todayAppointments: 8,
    prescriptionsIssued: 23,
    pendingReviews: 5
  };

  const todayAppointments = [
    {
      id: '1',
      patient: 'John Doe',
      time: '09:00 AM',
      type: 'Follow-up',
      status: 'confirmed'
    },
    {
      id: '2',
      patient: 'Jane Smith',
      time: '10:30 AM',
      type: 'Consultation',
      status: 'pending'
    },
    {
      id: '3',
      patient: 'Mike Johnson',
      time: '02:00 PM',
      type: 'Check-up',
      status: 'confirmed'
    }
  ];

  const recentPrescriptions = [
    {
      id: '1',
      patient: 'Sarah Wilson',
      medication: 'Amoxicillin 500mg',
      date: '2024-01-25',
      status: 'active'
    },
    {
      id: '2',
      patient: 'Robert Brown',
      medication: 'Lisinopril 10mg',
      date: '2024-01-24',
      status: 'fulfilled'
    }
  ];

  const patientAlerts = [
    {
      id: '1',
      patient: 'Emily Davis',
      message: 'Blood pressure reading requires attention',
      priority: 'high',
      time: '1 hour ago'
    },
    {
      id: '2',
      patient: 'David Miller',
      message: 'Prescription refill request',
      priority: 'medium',
      time: '3 hours ago'
    }
  ];

  return (
    <Layout title="Doctor Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-600 to-medical-600 rounded-xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Good Morning, Dr. Smith</h2>
          <p className="text-primary-100">
            You have {stats.todayAppointments} appointments scheduled for today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Patients"
            value={stats.totalPatients}
            change="+12"
            changeType="positive"
            icon={Users}
            color="primary"
          />
          <StatsCard
            title="Today's Appointments"
            value={stats.todayAppointments}
            icon={Calendar}
            color="medical"
          />
          <StatsCard
            title="Prescriptions Issued"
            value={stats.prescriptionsIssued}
            change="+5"
            changeType="positive"
            icon={FileText}
            color="success"
          />
          <StatsCard
            title="Pending Reviews"
            value={stats.pendingReviews}
            icon={Clock}
            color="warning"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View Full Calendar
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <Stethoscope className="w-5 h-5 text-primary-600" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{appointment.patient}</p>
                          <p className="text-sm text-gray-500">{appointment.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-900">{appointment.time}</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          appointment.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appointment.status}
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
                    <UserPlus className="w-5 h-5 text-primary-600" />
                    <span className="font-medium">Register New Patient</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-medical-600" />
                    <span className="font-medium">Create Prescription</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-5 h-5 text-success-600" />
                    <span className="font-medium">Patient History</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
              </div>
            </div>

            {/* Patient Alerts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Alerts</h3>
              <div className="space-y-3">
                {patientAlerts.map((alert) => (
                  <div key={alert.id} className="border-l-4 border-red-400 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{alert.patient}</p>
                        <p className="text-sm text-gray-600">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        alert.priority === 'high' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {alert.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Prescriptions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Prescriptions</h3>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All Prescriptions
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentPrescriptions.map((prescription) => (
              <div key={prescription.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <FileText className="w-5 h-5 text-medical-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{prescription.medication}</p>
                      <p className="text-sm text-gray-500">Patient: {prescription.patient}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">{new Date(prescription.date).toLocaleDateString()}</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      prescription.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {prescription.status}
                    </span>
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

export default DoctorDashboard;