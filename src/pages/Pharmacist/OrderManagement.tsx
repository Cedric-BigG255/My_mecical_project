import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { 
  ShoppingCart, 
  Search, 
  Filter,
  Eye,
  CheckCircle,
  Clock,
  Truck,
  Phone,
  User,
  Package,
  Calendar,
  DollarSign,
  MapPin,
  AlertCircle
} from 'lucide-react';

interface Order {
  id: string;
  patientName: string;
  patientPhone: string;
  patientAddress: string;
  prescriptionId: string;
  doctorName: string;
  medications: OrderMedication[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  deliveryType: 'pickup' | 'delivery';
  paymentMethod: 'cash' | 'card' | 'insurance' | 'online';
  insuranceProvider?: string;
  notes?: string;
  estimatedTime?: string;
}

interface OrderMedication {
  name: string;
  quantity: number;
  price: number;
  available: boolean;
  substituted?: boolean;
  substituteFor?: string;
}

const OrderManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const orders: Order[] = [
    {
      id: 'ORD001',
      patientName: 'John Smith',
      patientPhone: '+1 (555) 123-4567',
      patientAddress: '123 Main St, City, State 12345',
      prescriptionId: 'RX001',
      doctorName: 'Dr. Sarah Johnson',
      totalAmount: 44.49,
      status: 'preparing',
      orderDate: '2024-01-25T10:30:00Z',
      deliveryType: 'pickup',
      paymentMethod: 'insurance',
      insuranceProvider: 'BlueCross BlueShield',
      estimatedTime: '15 minutes',
      medications: [
        {
          name: 'Lisinopril 10mg',
          quantity: 30,
          price: 25.99,
          available: true
        },
        {
          name: 'Hydrochlorothiazide 25mg',
          quantity: 30,
          price: 18.50,
          available: true
        }
      ]
    },
    {
      id: 'ORD002',
      patientName: 'Emily Davis',
      patientPhone: '+1 (555) 987-6543',
      patientAddress: '456 Oak Ave, City, State 12346',
      prescriptionId: 'RX002',
      doctorName: 'Dr. Michael Chen',
      totalAmount: 122.74,
      status: 'ready',
      orderDate: '2024-01-24T14:15:00Z',
      deliveryType: 'delivery',
      paymentMethod: 'card',
      deliveryDate: '2024-01-25T16:00:00Z',
      notes: 'Patient requested delivery after 4 PM',
      medications: [
        {
          name: 'Metformin 500mg',
          quantity: 60,
          price: 32.75,
          available: true
        },
        {
          name: 'Insulin Glargine',
          quantity: 5,
          price: 89.99,
          available: false,
          substituted: true,
          substituteFor: 'Insulin Detemir'
        }
      ]
    },
    {
      id: 'ORD003',
      patientName: 'Robert Wilson',
      patientPhone: '+1 (555) 456-7890',
      patientAddress: '789 Pine St, City, State 12347',
      prescriptionId: 'RX003',
      doctorName: 'Dr. Lisa Thompson',
      totalAmount: 15.25,
      status: 'delivered',
      orderDate: '2024-01-23T09:45:00Z',
      deliveryType: 'pickup',
      paymentMethod: 'cash',
      medications: [
        {
          name: 'Amoxicillin 500mg',
          quantity: 21,
          price: 15.25,
          available: true
        }
      ]
    },
    {
      id: 'ORD004',
      patientName: 'Sarah Martinez',
      patientPhone: '+1 (555) 321-0987',
      patientAddress: '321 Elm Dr, City, State 12348',
      prescriptionId: 'RX004',
      doctorName: 'Dr. James Wilson',
      totalAmount: 67.50,
      status: 'pending',
      orderDate: '2024-01-25T16:20:00Z',
      deliveryType: 'pickup',
      paymentMethod: 'online',
      medications: [
        {
          name: 'Atorvastatin 20mg',
          quantity: 30,
          price: 42.75,
          available: true
        },
        {
          name: 'Aspirin 81mg',
          quantity: 90,
          price: 24.75,
          available: true
        }
      ]
    }
  ];

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'preparing':
        return <Package className="w-4 h-4 text-orange-500" />;
      case 'ready':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'delivered':
        return <Truck className="w-4 h-4 text-green-600" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'preparing':
        return 'bg-orange-100 text-orange-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.prescriptionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    ready: orders.filter(o => o.status === 'ready').length,
    delivered: orders.filter(o => o.status === 'delivered').length
  };

  if (selectedOrder) {
    return (
      <Layout title="Order Details">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedOrder(null)}
            className="mb-6 inline-flex items-center text-medical-600 hover:text-medical-700"
          >
            ← Back to Orders
          </button>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-medical-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Order #{selectedOrder.id}</h1>
                  <p className="text-primary-100">Prescription: {selectedOrder.prescriptionId}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)} text-gray-800`}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Patient & Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <User className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="font-medium">{selectedOrder.patientName}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">{selectedOrder.patientPhone}</span>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                      <span className="text-gray-600">{selectedOrder.patientAddress}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">
                        Ordered: {new Date(selectedOrder.orderDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Truck className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-600 capitalize">{selectedOrder.deliveryType}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-600 capitalize">{selectedOrder.paymentMethod}</span>
                      {selectedOrder.insuranceProvider && (
                        <span className="ml-2 text-sm text-blue-600">({selectedOrder.insuranceProvider})</span>
                      )}
                    </div>
                    {selectedOrder.estimatedTime && (
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-600">Ready in: {selectedOrder.estimatedTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Medications */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Medications</h3>
                <div className="space-y-4">
                  {selectedOrder.medications.map((medication, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Package className="w-5 h-5 text-medical-600 mr-3" />
                          <div>
                            <h4 className="font-semibold text-gray-900">{medication.name}</h4>
                            <p className="text-gray-600">Quantity: {medication.quantity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${medication.price.toFixed(2)}</p>
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            medication.available 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {medication.available ? 'Available' : 'Substituted'}
                          </div>
                        </div>
                      </div>
                      
                      {medication.substituted && (
                        <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
                          <p className="text-sm text-yellow-800">
                            <span className="font-medium">Substituted:</span> {medication.substituteFor} was not available
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Special Notes</h3>
                  <p className="text-gray-700 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    {selectedOrder.notes}
                  </p>
                </div>
              )}

              {/* Total */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                  <span className="text-2xl font-bold text-medical-600">
                    ${selectedOrder.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                {selectedOrder.status === 'pending' && (
                  <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Confirm Order
                  </button>
                )}
                {selectedOrder.status === 'confirmed' && (
                  <button className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                    <Package className="w-4 h-4 mr-2" />
                    Start Preparing
                  </button>
                )}
                {selectedOrder.status === 'preparing' && (
                  <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Ready
                  </button>
                )}
                {selectedOrder.status === 'ready' && selectedOrder.deliveryType === 'delivery' && (
                  <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <Truck className="w-4 h-4 mr-2" />
                    Mark as Delivered
                  </button>
                )}
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Patient
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  <Eye className="w-4 h-4 mr-2" />
                  Print Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Order Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
            <p className="text-gray-600 mt-1">Track and manage patient medication orders</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{orderStats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{orderStats.pending}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Preparing</p>
                <p className="text-2xl font-bold text-gray-900">{orderStats.preparing}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ready</p>
                <p className="text-2xl font-bold text-gray-900">{orderStats.ready}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-gray-900">{orderStats.delivered}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none w-full sm:w-64"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedOrder(order)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    {getStatusIcon(order.status)}
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order #{order.id}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    {order.estimatedTime && order.status === 'preparing' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {order.estimatedTime}
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Patient</p>
                      <p className="font-medium text-gray-900">{order.patientName}</p>
                      <p className="text-sm text-gray-600">{order.patientPhone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Prescription</p>
                      <p className="font-medium text-gray-900">{order.prescriptionId}</p>
                      <p className="text-sm text-gray-600">Dr. {order.doctorName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Delivery</p>
                      <p className="font-medium text-gray-900 capitalize">{order.deliveryType}</p>
                      <p className="text-sm text-gray-600 capitalize">{order.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="font-bold text-gray-900">${order.totalAmount.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">{order.medications.length} item(s)</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(order.orderDate).toLocaleDateString()}
                    </div>
                    {order.deliveryDate && (
                      <div className="flex items-center">
                        <Truck className="w-4 h-4 mr-1" />
                        Delivery: {new Date(order.deliveryDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedOrder(order);
                    }}
                    className="p-2 text-gray-400 hover:text-medical-600 hover:bg-medical-50 rounded-lg transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or check back later.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default OrderManagement;