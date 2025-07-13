import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { 
  Package, 
  Search, 
  Filter,
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  TrendingDown,
  TrendingUp,
  Calendar,
  DollarSign,
  Pill,
  Eye,
  Download,
  Upload
} from 'lucide-react';

interface Medicine {
  id: string;
  name: string;
  genericName: string;
  manufacturer: string;
  category: string;
  dosageForm: string;
  strength: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unitPrice: number;
  sellingPrice: number;
  expiryDate: string;
  batchNumber: string;
  supplier: string;
  requiresPrescription: boolean;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'expired';
}

const InventoryManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);

  const medicines: Medicine[] = [
    {
      id: 'M001',
      name: 'Paracetamol',
      genericName: 'Acetaminophen',
      manufacturer: 'PharmaCorp',
      category: 'Analgesic',
      dosageForm: 'Tablet',
      strength: '500mg',
      currentStock: 15,
      minStock: 50,
      maxStock: 500,
      unitPrice: 0.25,
      sellingPrice: 0.50,
      expiryDate: '2025-06-15',
      batchNumber: 'PC2024001',
      supplier: 'MedSupply Co.',
      requiresPrescription: false,
      status: 'low-stock'
    },
    {
      id: 'M002',
      name: 'Amoxicillin',
      genericName: 'Amoxicillin',
      manufacturer: 'AntiBio Labs',
      category: 'Antibiotic',
      dosageForm: 'Capsule',
      strength: '500mg',
      currentStock: 120,
      minStock: 30,
      maxStock: 300,
      unitPrice: 0.75,
      sellingPrice: 1.50,
      expiryDate: '2024-12-20',
      batchNumber: 'AB2024015',
      supplier: 'MedSupply Co.',
      requiresPrescription: true,
      status: 'in-stock'
    },
    {
      id: 'M003',
      name: 'Insulin Glargine',
      genericName: 'Insulin Glargine',
      manufacturer: 'DiabetesCare Inc.',
      category: 'Antidiabetic',
      dosageForm: 'Injection',
      strength: '100 units/mL',
      currentStock: 0,
      minStock: 10,
      maxStock: 50,
      unitPrice: 45.00,
      sellingPrice: 89.99,
      expiryDate: '2024-08-30',
      batchNumber: 'DC2024008',
      supplier: 'Diabetes Solutions',
      requiresPrescription: true,
      status: 'out-of-stock'
    },
    {
      id: 'M004',
      name: 'Lisinopril',
      genericName: 'Lisinopril',
      manufacturer: 'CardioMed',
      category: 'ACE Inhibitor',
      dosageForm: 'Tablet',
      strength: '10mg',
      currentStock: 85,
      minStock: 40,
      maxStock: 200,
      unitPrice: 0.85,
      sellingPrice: 1.75,
      expiryDate: '2025-03-10',
      batchNumber: 'CM2024012',
      supplier: 'HeartCare Supplies',
      requiresPrescription: true,
      status: 'in-stock'
    },
    {
      id: 'M005',
      name: 'Aspirin',
      genericName: 'Acetylsalicylic Acid',
      manufacturer: 'PainRelief Co.',
      category: 'Analgesic',
      dosageForm: 'Tablet',
      strength: '81mg',
      currentStock: 5,
      minStock: 25,
      maxStock: 150,
      unitPrice: 0.15,
      sellingPrice: 0.30,
      expiryDate: '2024-02-15',
      batchNumber: 'PR2023045',
      supplier: 'General Pharma',
      requiresPrescription: false,
      status: 'expired'
    }
  ];

  const categories = [
    'Analgesic', 'Antibiotic', 'Antidiabetic', 'ACE Inhibitor', 
    'Antihypertensive', 'Antihistamine', 'Vitamin', 'Supplement'
  ];

  const getStatusIcon = (status: Medicine['status']) => {
    switch (status) {
      case 'in-stock':
        return <Package className="w-4 h-4 text-green-500" />;
      case 'low-stock':
        return <TrendingDown className="w-4 h-4 text-yellow-500" />;
      case 'out-of-stock':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'expired':
        return <Calendar className="w-4 h-4 text-red-500" />;
      default:
        return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Medicine['status']) => {
    switch (status) {
      case 'in-stock':
        return 'bg-green-100 text-green-800';
      case 'low-stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || medicine.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || medicine.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const inventoryStats = {
    totalMedicines: medicines.length,
    lowStock: medicines.filter(m => m.status === 'low-stock').length,
    outOfStock: medicines.filter(m => m.status === 'out-of-stock').length,
    expired: medicines.filter(m => m.status === 'expired').length,
    totalValue: medicines.reduce((total, med) => total + (med.currentStock * med.unitPrice), 0)
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  return (
    <Layout title="Inventory Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
            <p className="text-gray-600 mt-1">Manage your pharmacy's medicine inventory</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2 bg-medical-600 text-white rounded-lg text-sm font-medium hover:bg-medical-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Medicine
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{inventoryStats.totalMedicines}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-gray-900">{inventoryStats.lowStock}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-gray-900">{inventoryStats.outOfStock}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Expired</p>
                <p className="text-2xl font-bold text-gray-900">{inventoryStats.expired}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">${inventoryStats.totalValue.toFixed(0)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search medicines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none w-full sm:w-64"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none"
              >
                <option value="all">All Status</option>
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
                <option value="expired">Expired</option>
              </select>
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Medicine
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expiry
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMedicines.map((medicine) => (
                  <tr key={medicine.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Pill className="w-8 h-8 text-medical-600 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{medicine.name}</div>
                          <div className="text-sm text-gray-500">{medicine.genericName} • {medicine.strength}</div>
                          <div className="text-xs text-gray-400">{medicine.manufacturer}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {medicine.category}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">{medicine.dosageForm}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{medicine.currentStock}</div>
                      <div className="text-xs text-gray-500">Min: {medicine.minStock}</div>
                      {medicine.currentStock <= medicine.minStock && (
                        <div className="text-xs text-red-600 font-medium">Low Stock!</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${medicine.sellingPrice}</div>
                      <div className="text-xs text-gray-500">Cost: ${medicine.unitPrice}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(medicine.expiryDate).toLocaleDateString()}</div>
                      {isExpiringSoon(medicine.expiryDate) && (
                        <div className="text-xs text-yellow-600 font-medium">Expires Soon</div>
                      )}
                      <div className="text-xs text-gray-500">Batch: {medicine.batchNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(medicine.status)}
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(medicine.status)}`}>
                          {medicine.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </div>
                      {medicine.requiresPrescription && (
                        <div className="text-xs text-blue-600 mt-1">Rx Required</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setSelectedMedicine(medicine)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredMedicines.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No medicines found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or add new medicines.</p>
            </div>
          )}
        </div>

        {/* Alerts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Low Stock Alerts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Low Stock Alerts</h3>
            <div className="space-y-3">
              {medicines.filter(m => m.status === 'low-stock').map((medicine) => (
                <div key={medicine.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div>
                    <p className="font-medium text-gray-900">{medicine.name}</p>
                    <p className="text-sm text-gray-600">Stock: {medicine.currentStock} (Min: {medicine.minStock})</p>
                  </div>
                  <button className="px-3 py-1 bg-yellow-600 text-white rounded text-xs hover:bg-yellow-700">
                    Reorder
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Expiring Soon */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Expiring Soon</h3>
            <div className="space-y-3">
              {medicines.filter(m => isExpiringSoon(m.expiryDate)).map((medicine) => (
                <div key={medicine.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div>
                    <p className="font-medium text-gray-900">{medicine.name}</p>
                    <p className="text-sm text-gray-600">Expires: {new Date(medicine.expiryDate).toLocaleDateString()}</p>
                  </div>
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">
                    {Math.ceil((new Date(medicine.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InventoryManagement;