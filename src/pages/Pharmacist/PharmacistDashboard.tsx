import React from 'react';
import Layout from '../../components/Layout/Layout';
import StatsCard from '../../components/Dashboard/StatsCard';
import { 
  FileText, 
  ShoppingCart, 
  Package, 
  CreditCard,
  Clock,
  CheckCircle,
  AlertCircle,
  Pill,
  TrendingUp,
  Users
} from 'lucide-react';

const PharmacistDashboard: React.FC = () => {
  const stats = {
    newPrescriptions: 12,
    pendingOrders: 8,
    lowStockItems: 5,
    insuranceClaims: 15
  };

  const newPrescriptions = [
    {
      id: '1',
      patient: 'John Doe',
      doctor: 'Dr. Smith',
      medication: 'Amoxicillin 500mg',
      quantity: 30,
      time: '10:30 AM',
      urgent: false
    },
    {
      id: '2',
      patient: 'Jane Smith',
      doctor: 'Dr. Johnson',
      medication: 'Insulin Glargine',
      quantity: 5,
      time: '11:15 AM',
      urgent: true
    }
  ];

  const pendingOrders = [
    {
      id: '1',
      patient: 'Mike Johnson',
      items: 3,
      total: 45.99,
      status: 'preparing',
      estimatedTime: '15 mins'
    },
    {
      id: '2',
      patient: 'Sarah Wilson',
      items: 2,
      total: 28.50,
      status: 'ready',
      estimatedTime: 'Ready'
    }
  ];

  const lowStockAlerts = [
    {
      id: '1',
      medicine: 'Paracetamol 500mg',
      currentStock: 15,
      minStock: 50,
      supplier: 'MedSupply Co.'
    },
    {
      id: '2',
      medicine: 'Ibuprofen 400mg',
      currentStock: 8,
      minStock: 30,
      supplier: 'PharmaCorp'
    }
  ];

  return (
    <Layout title="Pharmacist Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-medical-600 to-success-600 rounded-xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome to Your Pharmacy Dashboard</h2>
          <p className="text-medical-100">
            Manage prescriptions, orders, and inventory efficiently
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="New Prescriptions"
            value={stats.newPrescriptions}
            change="+3"
            changeType="positive"
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
            title="Low Stock Items"
            value={stats.lowStockItems}
            icon={Package}
            color="error"
          />
          <StatsCard
            title="Insurance Claims"
            value={stats.insuranceClaims}
            change="+7"
            changeType="positive"
            icon={CreditCard}
            color="success"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* New Prescriptions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">New Prescriptions</h3>
                  <button className="text-medical-600 hover:text-medical-700 text-sm font-medium">
                    View All
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {newPrescriptions.map((prescription) => (
                  <div key={prescription.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            prescription.urgent ? 'bg-red-100' : 'bg-medical-100'
                          }`}>
                            <FileText className={`w-5 h-5 ${
                              prescription.urgent ? 'text-red-600' : 'text-medical-600'
                            }`} />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{prescription.medication}</p>
                          <p className="text-sm text-gray-500">
                            Patient: {prescription.patient} • Dr: {prescription.doctor}
                          </p>
                          <p className="text-xs text-gray-500">Qty: {prescription.quantity} • {prescription.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {prescription.urgent && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Urgent
                          </span>
                        )}
                        <button className="px-3 py-1 bg-medical-600 text-white rounded-lg text-xs hover:bg-medical-700">
                          Process
                        </button>
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
                    <Pill className="w-5 h-5 text-medical-600" />
                    <span className="font-medium">Add Medicine</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Package className="w-5 h-5 text-primary-600" />
                    <span className="font-medium">Update Inventory</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5 text-success-600" />
                    <span className="font-medium">Process Claims</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
              </div>
            </div>

            {/* Low Stock Alerts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Low Stock Alerts</h3>
              <div className="space-y-3">
                {lowStockAlerts.map((alert) => (
                  <div key={alert.id} className="border-l-4 border-red-400 pl-4">
                    <p className="text-sm font-medium text-gray-900">{alert.medicine}</p>
                    <p className="text-sm text-red-600">
                      Stock: {alert.currentStock} (Min: {alert.minStock})
                    </p>
                    <p className="text-xs text-gray-500">{alert.supplier}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Pending Orders</h3>
              <button className="text-medical-600 hover:text-medical-700 text-sm font-medium">
                View All Orders
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {pendingOrders.map((order) => (
              <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <ShoppingCart className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.patient}</p>
                      <p className="text-sm text-gray-500">{order.items} items • ${order.total}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">{order.estimatedTime}</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'ready' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                    <button className="px-3 py-1 bg-primary-600 text-white rounded-lg text-xs hover:bg-primary-700">
                      Update
                    </button>
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

export default PharmacistDashboard;