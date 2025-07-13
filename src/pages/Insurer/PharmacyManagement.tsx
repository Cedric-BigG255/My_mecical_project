import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { 
  Building2, 
  Search, 
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  TrendingUp,
  AlertCircle,
  Shield
} from 'lucide-react';

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  licenseNumber: string;
  contractStartDate: string;
  contractEndDate: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  rating: number;
  totalClaims: number;
  monthlyVolume: number;
  averageClaimAmount: number;
  lastClaimDate: string;
  complianceScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  services: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

const PharmacyManagementInsurer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const pharmacies: Pharmacy[] = [
    {
      id: 'PH001',
      name: 'HealthFirst Pharmacy',
      address: '123 Main Street, Downtown, City 12345',
      phone: '+1 (555) 123-4567',
      email: 'contact@healthfirst.com',
      licenseNumber: 'PH123456',
      contractStartDate: '2023-01-15',
      contractEndDate: '2025-01-15',
      status: 'active',
      rating: 4.8,
      totalClaims: 1247,
      monthlyVolume: 89,
      averageClaimAmount: 125.50,
      lastClaimDate: '2024-01-25',
      complianceScore: 95,
      riskLevel: 'low',
      services: ['Prescription Filling', 'Consultation', 'Home Delivery', 'Insurance Processing'],
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: 'PH002',
      name: 'MediCare Plus Pharmacy',
      address: '456 Oak Avenue, Midtown, City 12346',
      phone: '+1 (555) 987-6543',
      email: 'info@medicareplus.com',
      licenseNumber: 'PH789012',
      contractStartDate: '2023-03-20',
      contractEndDate: '2025-03-20',
      status: 'active',
      rating: 4.6,
      totalClaims: 892,
      monthlyVolume: 67,
      averageClaimAmount: 98.75,
      lastClaimDate: '2024-01-24',
      complianceScore: 88,
      riskLevel: 'medium',
      services: ['Prescription Filling', 'Consultation', 'Insurance Processing'],
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    {
      id: 'PH003',
      name: 'QuickMeds Pharmacy',
      address: '789 Pine Street, Uptown, City 12347',
      phone: '+1 (555) 456-7890',
      email: 'support@quickmeds.com',
      licenseNumber: 'PH345678',
      contractStartDate: '2023-06-10',
      contractEndDate: '2025-06-10',
      status: 'active',
      rating: 4.4,
      totalClaims: 634,
      monthlyVolume: 45,
      averageClaimAmount: 156.20,
      lastClaimDate: '2024-01-23',
      complianceScore: 92,
      riskLevel: 'low',
      services: ['Prescription Filling', 'Home Delivery', 'Insurance Processing'],
      coordinates: { lat: 40.7831, lng: -73.9712 }
    },
    {
      id: 'PH004',
      name: 'Community Health Pharmacy',
      address: '321 Elm Drive, Westside, City 12348',
      phone: '+1 (555) 321-0987',
      email: 'hello@communityhealth.com',
      licenseNumber: 'PH901234',
      contractStartDate: '2023-09-05',
      contractEndDate: '2025-09-05',
      status: 'pending',
      rating: 4.2,
      totalClaims: 234,
      monthlyVolume: 23,
      averageClaimAmount: 87.30,
      lastClaimDate: '2024-01-22',
      complianceScore: 76,
      riskLevel: 'high',
      services: ['Prescription Filling', 'Consultation'],
      coordinates: { lat: 40.7505, lng: -73.9934 }
    },
    {
      id: 'PH005',
      name: 'Metro Pharmacy Network',
      address: '654 Broadway, Central, City 12349',
      phone: '+1 (555) 654-3210',
      email: 'contact@metropharma.com',
      licenseNumber: 'PH567890',
      contractStartDate: '2022-12-01',
      contractEndDate: '2024-12-01',
      status: 'suspended',
      rating: 3.8,
      totalClaims: 1567,
      monthlyVolume: 12,
      averageClaimAmount: 203.45,
      lastClaimDate: '2024-01-15',
      complianceScore: 65,
      riskLevel: 'high',
      services: ['Prescription Filling', 'Insurance Processing'],
      coordinates: { lat: 40.7282, lng: -73.9942 }
    }
  ];

  const getStatusIcon = (status: Pharmacy['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive':
        return <XCircle className="w-4 h-4 text-gray-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'suspended':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Pharmacy['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: Pharmacy['riskLevel']) => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPharmacies = pharmacies.filter(pharmacy => {
    const matchesSearch = pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pharmacy.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || pharmacy.status === statusFilter;
    const matchesRisk = riskFilter === 'all' || pharmacy.riskLevel === riskFilter;
    return matchesSearch && matchesStatus && matchesRisk;
  });

  const pharmacyStats = {
    total: pharmacies.length,
    active: pharmacies.filter(p => p.status === 'active').length,
    pending: pharmacies.filter(p => p.status === 'pending').length,
    suspended: pharmacies.filter(p => p.status === 'suspended').length,
    highRisk: pharmacies.filter(p => p.riskLevel === 'high').length,
    averageRating: pharmacies.reduce((sum, p) => sum + p.rating, 0) / pharmacies.length
  };

  if (selectedPharmacy) {
    return (
      <Layout title="Pharmacy Details">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setSelectedPharmacy(null)}
            className="mb-6 inline-flex items-center text-primary-600 hover:text-primary-700"
          >
            ← Back to Pharmacies
          </button>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-success-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{selectedPharmacy.name}</h1>
                  <p className="text-primary-100">License: {selectedPharmacy.licenseNumber}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedPharmacy.status)} text-gray-800`}>
                    {selectedPharmacy.status.charAt(0).toUpperCase() + selectedPharmacy.status.slice(1)}
                  </span>
                  <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm">{selectedPharmacy.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Contact & Location Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                      <span className="text-gray-700">{selectedPharmacy.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-700">{selectedPharmacy.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-700">{selectedPharmacy.email}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contract Details</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Contract Period:</span>
                      <p className="font-medium text-gray-900">
                        {new Date(selectedPharmacy.contractStartDate).toLocaleDateString()} - {new Date(selectedPharmacy.contractEndDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Compliance Score:</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div 
                            className={`h-full rounded-full ${
                              selectedPharmacy.complianceScore >= 90 ? 'bg-green-500' :
                              selectedPharmacy.complianceScore >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${selectedPharmacy.complianceScore}%` }}
                          ></div>
                        </div>
                        <span className="font-medium text-gray-900">{selectedPharmacy.complianceScore}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Risk Level:</span>
                      <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(selectedPharmacy.riskLevel)}`}>
                        {selectedPharmacy.riskLevel.charAt(0).toUpperCase() + selectedPharmacy.riskLevel.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-600">Total Claims</p>
                    <p className="text-2xl font-bold text-blue-900">{selectedPharmacy.totalClaims.toLocaleString()}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600">Monthly Volume</p>
                    <p className="text-2xl font-bold text-green-900">{selectedPharmacy.monthlyVolume}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-purple-600">Avg Claim Amount</p>
                    <p className="text-2xl font-bold text-purple-900">${selectedPharmacy.averageClaimAmount}</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm text-orange-600">Last Claim</p>
                    <p className="text-2xl font-bold text-orange-900">
                      {Math.ceil((new Date().getTime() - new Date(selectedPharmacy.lastClaimDate).getTime()) / (1000 * 60 * 60 * 24))} days ago
                    </p>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Offered</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPharmacy.services.map((service, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Interactive map would be displayed here</p>
                    <p className="text-sm text-gray-400">Lat: {selectedPharmacy.coordinates.lat}, Lng: {selectedPharmacy.coordinates.lng}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                {selectedPharmacy.status === 'pending' && (
                  <>
                    <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve Partnership
                    </button>
                    <button className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject Application
                    </button>
                  </>
                )}
                {selectedPharmacy.status === 'active' && (
                  <button className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Suspend Partnership
                  </button>
                )}
                {selectedPharmacy.status === 'suspended' && (
                  <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Reactivate Partnership
                  </button>
                )}
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Details
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Pharmacy Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Pharmacy Management</h2>
            <p className="text-gray-600 mt-1">Manage partner pharmacies and their contracts</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Pharmacy
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{pharmacyStats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">{pharmacyStats.active}</p>
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
                <p className="text-2xl font-bold text-gray-900">{pharmacyStats.pending}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Suspended</p>
                <p className="text-2xl font-bold text-gray-900">{pharmacyStats.suspended}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">High Risk</p>
                <p className="text-2xl font-bold text-gray-900">{pharmacyStats.highRisk}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">{pharmacyStats.averageRating.toFixed(1)}</p>
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
                  placeholder="Search pharmacies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none w-full sm:w-64"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>

        {/* Pharmacies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPharmacies.map((pharmacy) => (
            <div
              key={pharmacy.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedPharmacy(pharmacy)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Building2 className="w-10 h-10 text-primary-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{pharmacy.name}</h3>
                    <p className="text-sm text-gray-500">License: {pharmacy.licenseNumber}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(pharmacy.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pharmacy.status)}`}>
                    {pharmacy.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="text-sm text-gray-600">{pharmacy.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{pharmacy.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{pharmacy.rating}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(pharmacy.riskLevel)}`}>
                    {pharmacy.riskLevel} risk
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-500">Claims:</span>
                  <span className="ml-1 font-medium">{pharmacy.totalClaims}</span>
                </div>
                <div>
                  <span className="text-gray-500">Monthly:</span>
                  <span className="ml-1 font-medium">{pharmacy.monthlyVolume}</span>
                </div>
                <div>
                  <span className="text-gray-500">Avg Amount:</span>
                  <span className="ml-1 font-medium">${pharmacy.averageClaimAmount}</span>
                </div>
                <div>
                  <span className="text-gray-500">Compliance:</span>
                  <span className="ml-1 font-medium">{pharmacy.complianceScore}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPharmacy(pharmacy);
                  }}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </button>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPharmacies.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No pharmacies found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or add new pharmacies.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PharmacyManagementInsurer;