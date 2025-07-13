import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { 
  FileText, 
  Search, 
  Plus,
  Trash2,
  Save,
  Send,
  User,
  Pill,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  Edit,
  Copy
} from 'lucide-react';

interface Medication {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  quantity: number;
  refills: number;
}

interface PrescriptionForm {
  patientId: string;
  patientName: string;
  diagnosis: string;
  medications: Medication[];
  notes: string;
  followUpDate?: string;
}

const EPrescription: React.FC = () => {
  const [searchPatient, setSearchPatient] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [searchMedication, setSearchMedication] = useState('');
  const [prescriptionForm, setPrescriptionForm] = useState<PrescriptionForm>({
    patientId: '',
    patientName: '',
    diagnosis: '',
    medications: [],
    notes: '',
    followUpDate: ''
  });

  // Mock data
  const patients = [
    { id: 'P001', name: 'John Smith', age: 39, bloodType: 'A+' },
    { id: 'P002', name: 'Sarah Johnson', age: 32, bloodType: 'O-' },
    { id: 'P003', name: 'Michael Brown', age: 46, bloodType: 'B+' },
    { id: 'P004', name: 'Emily Davis', age: 29, bloodType: 'AB+' }
  ];

  const medications = [
    {
      id: 'M001',
      name: 'Lisinopril',
      genericName: 'Lisinopril',
      commonDosages: ['5mg', '10mg', '20mg'],
      category: 'ACE Inhibitor'
    },
    {
      id: 'M002',
      name: 'Metformin',
      genericName: 'Metformin HCl',
      commonDosages: ['500mg', '850mg', '1000mg'],
      category: 'Antidiabetic'
    },
    {
      id: 'M003',
      name: 'Amoxicillin',
      genericName: 'Amoxicillin',
      commonDosages: ['250mg', '500mg', '875mg'],
      category: 'Antibiotic'
    },
    {
      id: 'M004',
      name: 'Atorvastatin',
      genericName: 'Atorvastatin Calcium',
      commonDosages: ['10mg', '20mg', '40mg', '80mg'],
      category: 'Statin'
    }
  ];

  const commonDiagnoses = [
    'Hypertension',
    'Type 2 Diabetes',
    'Upper Respiratory Infection',
    'Acute Bronchitis',
    'Hyperlipidemia',
    'Gastroesophageal Reflux Disease',
    'Urinary Tract Infection',
    'Allergic Rhinitis'
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchPatient.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchPatient.toLowerCase())
  );

  const filteredMedications = medications.filter(med =>
    med.name.toLowerCase().includes(searchMedication.toLowerCase()) ||
    med.genericName.toLowerCase().includes(searchMedication.toLowerCase())
  );

  const addMedication = (medication: any) => {
    const newMedication: Medication = {
      id: Date.now().toString(),
      name: medication.name,
      genericName: medication.genericName,
      dosage: medication.commonDosages[0],
      frequency: 'Once daily',
      duration: '30 days',
      instructions: 'Take with food',
      quantity: 30,
      refills: 0
    };

    setPrescriptionForm(prev => ({
      ...prev,
      medications: [...prev.medications, newMedication]
    }));
    setSearchMedication('');
  };

  const updateMedication = (id: string, field: keyof Medication, value: any) => {
    setPrescriptionForm(prev => ({
      ...prev,
      medications: prev.medications.map(med =>
        med.id === id ? { ...med, [field]: value } : med
      )
    }));
  };

  const removeMedication = (id: string) => {
    setPrescriptionForm(prev => ({
      ...prev,
      medications: prev.medications.filter(med => med.id !== id)
    }));
  };

  const selectPatient = (patient: any) => {
    setSelectedPatient(patient);
    setPrescriptionForm(prev => ({
      ...prev,
      patientId: patient.id,
      patientName: patient.name
    }));
    setSearchPatient('');
  };

  const savePrescription = () => {
    console.log('Saving prescription:', prescriptionForm);
    // Handle save logic
  };

  const sendPrescription = () => {
    console.log('Sending prescription:', prescriptionForm);
    // Handle send logic
  };

  return (
    <Layout title="E-Prescription Tool">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">E-Prescription Tool</h2>
            <p className="text-gray-600 mt-1">Create and manage digital prescriptions</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button
              onClick={savePrescription}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </button>
            <button
              onClick={sendPrescription}
              className="inline-flex items-center px-4 py-2 bg-medical-600 text-white rounded-lg hover:bg-medical-700"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Prescription
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Patient</h3>
              
              {selectedPatient ? (
                <div className="border border-medical-200 rounded-lg p-4 bg-medical-50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{selectedPatient.name}</h4>
                    <button
                      onClick={() => {
                        setSelectedPatient(null);
                        setPrescriptionForm(prev => ({ ...prev, patientId: '', patientName: '' }));
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">ID: {selectedPatient.id}</p>
                  <p className="text-sm text-gray-600">Age: {selectedPatient.age} years</p>
                  <p className="text-sm text-gray-600">Blood Type: {selectedPatient.bloodType}</p>
                </div>
              ) : (
                <div>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search patients..."
                      value={searchPatient}
                      onChange={(e) => setSearchPatient(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none w-full"
                    />
                  </div>
                  
                  {searchPatient && (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {filteredPatients.map((patient) => (
                        <div
                          key={patient.id}
                          onClick={() => selectPatient(patient)}
                          className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <div className="flex items-center space-x-3">
                            <User className="w-8 h-8 text-gray-400" />
                            <div>
                              <p className="font-medium text-gray-900">{patient.name}</p>
                              <p className="text-sm text-gray-500">ID: {patient.id}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Templates */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Templates</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <p className="font-medium text-gray-900">Hypertension Treatment</p>
                  <p className="text-sm text-gray-500">Lisinopril + Hydrochlorothiazide</p>
                </button>
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <p className="font-medium text-gray-900">Diabetes Management</p>
                  <p className="text-sm text-gray-500">Metformin + Insulin</p>
                </button>
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <p className="font-medium text-gray-900">Respiratory Infection</p>
                  <p className="text-sm text-gray-500">Amoxicillin + Cough suppressant</p>
                </button>
              </div>
            </div>
          </div>

          {/* Prescription Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Diagnosis */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Diagnosis & Notes</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Diagnosis</label>
                  <input
                    type="text"
                    value={prescriptionForm.diagnosis}
                    onChange={(e) => setPrescriptionForm(prev => ({ ...prev, diagnosis: e.target.value }))}
                    placeholder="Enter diagnosis..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none"
                    list="diagnoses"
                  />
                  <datalist id="diagnoses">
                    {commonDiagnoses.map((diagnosis, index) => (
                      <option key={index} value={diagnosis} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Clinical Notes</label>
                  <textarea
                    value={prescriptionForm.notes}
                    onChange={(e) => setPrescriptionForm(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Additional notes, instructions, or observations..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Follow-up Date (Optional)</label>
                  <input
                    type="date"
                    value={prescriptionForm.followUpDate}
                    onChange={(e) => setPrescriptionForm(prev => ({ ...prev, followUpDate: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Medications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Medications</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search medications..."
                    value={searchMedication}
                    onChange={(e) => setSearchMedication(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none w-64"
                  />
                </div>
              </div>

              {/* Medication Search Results */}
              {searchMedication && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">Search Results:</p>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {filteredMedications.map((medication) => (
                      <div
                        key={medication.id}
                        onClick={() => addMedication(medication)}
                        className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded cursor-pointer hover:bg-gray-50"
                      >
                        <div>
                          <p className="font-medium text-gray-900">{medication.name}</p>
                          <p className="text-sm text-gray-500">{medication.genericName} • {medication.category}</p>
                        </div>
                        <Plus className="w-4 h-4 text-medical-600" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Added Medications */}
              <div className="space-y-4">
                {prescriptionForm.medications.map((medication, index) => (
                  <div key={medication.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Pill className="w-5 h-5 text-medical-600" />
                        <div>
                          <h4 className="font-medium text-gray-900">{medication.name}</h4>
                          <p className="text-sm text-gray-500">{medication.genericName}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeMedication(medication.id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Dosage</label>
                        <input
                          type="text"
                          value={medication.dosage}
                          onChange={(e) => updateMedication(medication.id, 'dosage', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-medical-500 focus:border-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Frequency</label>
                        <select
                          value={medication.frequency}
                          onChange={(e) => updateMedication(medication.id, 'frequency', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-medical-500 focus:border-transparent outline-none"
                        >
                          <option>Once daily</option>
                          <option>Twice daily</option>
                          <option>Three times daily</option>
                          <option>Four times daily</option>
                          <option>As needed</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Duration</label>
                        <input
                          type="text"
                          value={medication.duration}
                          onChange={(e) => updateMedication(medication.id, 'duration', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-medical-500 focus:border-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Quantity</label>
                        <input
                          type="number"
                          value={medication.quantity}
                          onChange={(e) => updateMedication(medication.id, 'quantity', parseInt(e.target.value))}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-medical-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Instructions</label>
                      <input
                        type="text"
                        value={medication.instructions}
                        onChange={(e) => updateMedication(medication.id, 'instructions', e.target.value)}
                        placeholder="Special instructions for patient..."
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-medical-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div className="mt-3 flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <label className="text-xs font-medium text-gray-700">Refills:</label>
                        <input
                          type="number"
                          value={medication.refills}
                          onChange={(e) => updateMedication(medication.id, 'refills', parseInt(e.target.value))}
                          min="0"
                          max="5"
                          className="w-16 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-medical-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {prescriptionForm.medications.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Pill className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p>No medications added yet</p>
                    <p className="text-sm">Search and add medications above</p>
                  </div>
                )}
              </div>
            </div>

            {/* Prescription Preview */}
            {(selectedPatient && prescriptionForm.medications.length > 0) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Prescription Preview</h3>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <h4 className="font-semibold text-gray-900">Dr. John Smith, MD</h4>
                    <p className="text-sm text-gray-600">Internal Medicine</p>
                    <p className="text-sm text-gray-600">License: MD123456</p>
                  </div>

                  <div className="mb-4">
                    <p className="font-medium text-gray-900">Patient: {selectedPatient.name}</p>
                    <p className="text-sm text-gray-600">ID: {selectedPatient.id}</p>
                    <p className="text-sm text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                  </div>

                  <div className="mb-4">
                    <p className="font-medium text-gray-900">Diagnosis: {prescriptionForm.diagnosis}</p>
                  </div>

                  <div className="space-y-3">
                    {prescriptionForm.medications.map((med, index) => (
                      <div key={med.id} className="bg-white p-3 rounded border">
                        <p className="font-medium">{index + 1}. {med.name} {med.dosage}</p>
                        <p className="text-sm text-gray-600">
                          {med.frequency} for {med.duration} • Qty: {med.quantity} • Refills: {med.refills}
                        </p>
                        <p className="text-sm text-gray-600">Instructions: {med.instructions}</p>
                      </div>
                    ))}
                  </div>

                  {prescriptionForm.notes && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="font-medium text-gray-900">Notes:</p>
                      <p className="text-sm text-gray-600">{prescriptionForm.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EPrescription;