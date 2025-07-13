import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { 
  FileText, 
  Search, 
  Filter,
  Download,
  Eye,
  Calendar,
  Clock,
  User,
  Pill,
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCw,
  Share2,
  QrCode
} from 'lucide-react';

interface Prescription {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  issuedDate: string;
  validUntil: string;
  status: 'active' | 'expired' | 'fulfilled' | 'cancelled';
  medications: Medication[];
  diagnosis: string;
  notes?: string;
  qrCode: string;
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  quantity: number;
  refills: number;
}

const MyPrescriptions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [showQRCode, setShowQRCode] = useState(false);

  const prescriptions: Prescription[] = [
    {
      id: 'RX001',
      doctorName: 'Dr. John Smith',
      doctorSpecialty: 'Internal Medicine',
      issuedDate: '2024-01-25',
      validUntil: '2024-02-25',
      status: 'active',
      diagnosis: 'Hypertension',
      notes: 'Take with food. Monitor blood pressure regularly.',
      qrCode: 'QR_CODE_DATA_HERE',
      medications: [
        {
          name: 'Lisinopril',
          dosage: '10mg',
          frequency: 'Once daily',
          duration: '30 days',
          instructions: 'Take in the morning with or without food',
          quantity: 30,
          refills: 5
        },
        {
          name: 'Hydrochlorothiazide',
          dosage: '25mg',
          frequency: 'Once daily',
          duration: '30 days',
          instructions: 'Take in the morning, may cause increased urination',
          quantity: 30,
          refills: 5
        }
      ]
    },
    {
      id: 'RX002',
      doctorName: 'Dr. Sarah Johnson',
      doctorSpecialty: 'Family Medicine',
      issuedDate: '2024-01-20',
      validUntil: '2024-01-27',
      status: 'fulfilled',
      diagnosis: 'Upper Respiratory Infection',
      notes: 'Complete the full course of antibiotics.',
      qrCode: 'QR_CODE_DATA_HERE',
      medications: [
        {
          name: 'Amoxicillin',
          dosage: '500mg',
          frequency: 'Three times daily',
          duration: '7 days',
          instructions: 'Take with food to reduce stomach upset',
          quantity: 21,
          refills: 0
        }
      ]
    },
    {
      id: 'RX003',
      doctorName: 'Dr. Michael Chen',
      doctorSpecialty: 'Cardiology',
      issuedDate: '2024-01-15',
      validUntil: '2024-01-22',
      status: 'expired',
      diagnosis: 'Chest Pain Evaluation',
      qrCode: 'QR_CODE_DATA_HERE',
      medications: [
        {
          name: 'Aspirin',
          dosage: '81mg',
          frequency: 'Once daily',
          duration: '7 days',
          instructions: 'Take with food',
          quantity: 7,
          refills: 0
        }
      ]
    }
  ];

  const getStatusIcon = (status: Prescription['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'expired':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'fulfilled':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-gray-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: Prescription['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'fulfilled':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.medications.some(med => med.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || prescription.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (selectedPrescription) {
    return (
      <Layout title="Prescription Details">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedPrescription(null)}
            className="mb-6 inline-flex items-center text-medical-600 hover:text-medical-700"
          >
            ← Back to Prescriptions
          </button>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-medical-600 to-primary-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Prescription #{selectedPrescription.id}</h1>
                  <p className="text-medical-100">Digital Prescription</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowQRCode(!showQRCode)}
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <QrCode className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Doctor Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Prescribing Doctor</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <User className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="font-medium">{selectedPrescription.doctorName}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-5 h-5 mr-3"></span>
                      <span className="text-gray-600">{selectedPrescription.doctorSpecialty}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Prescription Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                      <span>Issued: {new Date(selectedPrescription.issuedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-gray-400 mr-3" />
                      <span>Valid Until: {new Date(selectedPrescription.validUntil).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(selectedPrescription.status)}
                      <span className={`ml-3 px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedPrescription.status)}`}>
                        {selectedPrescription.status.charAt(0).toUpperCase() + selectedPrescription.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Diagnosis */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Diagnosis</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedPrescription.diagnosis}</p>
              </div>

              {/* Medications */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Prescribed Medications</h3>
                <div className="space-y-4">
                  {selectedPrescription.medications.map((medication, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <Pill className="w-5 h-5 text-medical-600 mr-3" />
                          <div>
                            <h4 className="font-semibold text-gray-900">{medication.name}</h4>
                            <p className="text-gray-600">{medication.dosage}</p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">Qty: {medication.quantity}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Frequency:</span>
                          <span className="ml-2 text-gray-600">{medication.frequency}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Duration:</span>
                          <span className="ml-2 text-gray-600">{medication.duration}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Refills:</span>
                          <span className="ml-2 text-gray-600">{medication.refills} remaining</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <span className="font-medium">Instructions:</span> {medication.instructions}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {selectedPrescription.notes && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Doctor's Notes</h3>
                  <p className="text-gray-700 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                    {selectedPrescription.notes}
                  </p>
                </div>
              )}

              {/* QR Code */}
              {showQRCode && (
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">QR Code for Pharmacy</h3>
                  <div className="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg mx-auto flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    Show this QR code to your pharmacist to access your prescription
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
                <button className="inline-flex items-center px-4 py-2 bg-medical-600 text-white rounded-lg hover:bg-medical-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share with Pharmacy
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Request Refill
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="My Prescriptions">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Prescriptions</h2>
            <p className="text-gray-600 mt-1">View and manage your digital prescriptions</p>
          </div>
          <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-medical-600 text-white rounded-lg hover:bg-medical-700">
            <Download className="w-4 h-4 mr-2" />
            Download All
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {prescriptions.filter(p => p.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Fulfilled</p>
                <p className="text-2xl font-bold text-gray-900">
                  {prescriptions.filter(p => p.status === 'fulfilled').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Expired</p>
                <p className="text-2xl font-bold text-gray-900">
                  {prescriptions.filter(p => p.status === 'expired').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-medical-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-medical-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{prescriptions.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search prescriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none w-full"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Status:</span>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="fulfilled">Fulfilled</option>
                <option value="expired">Expired</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Prescriptions List */}
        <div className="space-y-4">
          {filteredPrescriptions.map((prescription) => (
            <div
              key={prescription.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedPrescription(prescription)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    {getStatusIcon(prescription.status)}
                    <h3 className="text-lg font-semibold text-gray-900">
                      Prescription #{prescription.id}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(prescription.status)}`}>
                      {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Doctor</p>
                      <p className="font-medium text-gray-900">{prescription.doctorName}</p>
                      <p className="text-sm text-gray-600">{prescription.doctorSpecialty}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Diagnosis</p>
                      <p className="font-medium text-gray-900">{prescription.diagnosis}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Issued Date</p>
                      <p className="font-medium text-gray-900">
                        {new Date(prescription.issuedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{prescription.medications.length} medication(s)</span>
                    <span>•</span>
                    <span>Valid until {new Date(prescription.validUntil).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPrescription(prescription);
                    }}
                    className="p-2 text-gray-400 hover:text-medical-600 hover:bg-medical-50 rounded-lg transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 text-gray-400 hover:text-secondary-600 hover:bg-secondary-50 rounded-lg transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredPrescriptions.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No prescriptions found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or check back later.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyPrescriptions;