import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { 
  Search, 
  Plus,
  Trash2,
  Save,
  Send,
  User,
  Pill,
  Edit,
  Loader,
} from 'lucide-react';
import { apiClient } from '../../utils/api';
import { useDebounce } from '../../hooks/useDebounce';
import {
  Patient,
  Medication,
  PrescriptionMedication,
  PrescriptionForm,
} from '../../types/prescription';
import { useToast } from '../../components/common/ToastContainer';

const EPrescription: React.FC = () => {
  const [patientSearch, setPatientSearch] = useState('');
  const [medicineSearch, setMedicineSearch] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [medicines, setMedicines] = useState<Medication[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [prescriptionForm, setPrescriptionForm] = useState<PrescriptionForm>({
    patientId: '',
    chiefComplaints: '',
    findingsOnExam: '',
    advice: '',
    medicines: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { addToast } = useToast();
  const debouncedPatientSearch = useDebounce(patientSearch, 500);
  const debouncedMedicineSearch = useDebounce(medicineSearch, 500);

  useEffect(() => {
    if (debouncedPatientSearch) {
      apiClient.get(`/users/patients?search=${debouncedPatientSearch}&limit=10`)
        .then(response => {
          setPatients(response.data.data.map((p: any) => ({
            id: p.patientProfile.id,
            fullName: p.patientProfile.fullName,
            dateOfBirth: p.patientProfile.dateOfBirth,
          })));
        })
        .catch(error => console.error('Error fetching patients:', error));
    } else {
      setPatients([]);
    }
  }, [debouncedPatientSearch]);

  useEffect(() => {
    if (debouncedMedicineSearch) {
      apiClient.get(`/medicines?search=${debouncedMedicineSearch}&limit=10`)
        .then(response => {
          setMedicines(response.data);
        })
        .catch(error => console.error('Error fetching medicines:', error));
    } else {
      setMedicines([]);
    }
  }, [debouncedMedicineSearch]);

  const addMedication = (medication: Medication) => {
    const newMedication: PrescriptionMedication = {
      medicineId: medication.id,
      name: medication.brandName,
      genericName: medication.genericName,
      route: 'PO',
      form: 'Tablet',
      quantityPerDose: 1,
      frequency: 'tid',
      durationInDays: 5,
      fullInstruction: '1 tab tid for 5 days',
      totalQuantity: '15 tabs',
    };

    setPrescriptionForm(prev => ({
      ...prev,
      medicines: [...prev.medicines, newMedication],
    }));
    setMedicineSearch('');
  };

  const updateMedication = (index: number, field: keyof PrescriptionMedication, value: any) => {
    setPrescriptionForm(prev => ({
      ...prev,
      medicines: prev.medicines.map((med, i) =>
        i === index ? { ...med, [field]: value } : med
      ),
    }));
  };

  const removeMedication = (index: number) => {
    setPrescriptionForm(prev => ({
      ...prev,
      medicines: prev.medicines.filter((_, i) => i !== index),
    }));
  };

  const selectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setPrescriptionForm(prev => ({ ...prev, patientId: patient.id }));
    setPatientSearch('');
  };

  const savePrescription = () => {
    addToast('info', 'Draft saved!');
  };

  const sendPrescription = async () => {
    if (!prescriptionForm.patientId) {
      addToast('error', 'Please select a patient.');
      return;
    }
    if (prescriptionForm.medicines.length === 0) {
      addToast('error', 'Please add at least one medication.');
      return;
    }

    setIsSubmitting(true);
    const payload = {
      ...prescriptionForm,
      followUpDate: prescriptionForm.followUpDate
        ? new Date(prescriptionForm.followUpDate).toISOString()
        : undefined,
    };

    try {
      const response = await apiClient.post('/prescriptions', payload);
      if (response.success) {
        addToast('success', 'Prescription created successfully!');
        navigate(`/doctor/prescriptions/${response.data.id}`);
      } else {
        addToast('error', `Error: ${response.message}`);
      }
    } catch (error: any) {
      console.error('Error creating prescription:', error);
      addToast('error', `Error: ${error.response?.data?.message || 'An unexpected error occurred.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout title="E-Prescription Tool">
      <div className="max-w-7xl mx-auto space-y-8 p-4">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">E-Prescription</h1>
            <p className="text-gray-500 mt-1">Create and manage digital prescriptions with ease.</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button
              onClick={savePrescription}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-medical-500"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </button>
            <button
              onClick={sendPrescription}
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 bg-medical-600 text-white rounded-lg text-sm font-medium hover:bg-medical-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-medical-500 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              {isSubmitting ? 'Sending...' : 'Send Prescription'}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-3 text-medical-600" />
                Patient Information
              </h3>
              
              {selectedPatient ? (
                <div className="border-2 border-medical-500 rounded-lg p-4 bg-medical-50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-900 text-lg">{selectedPatient.fullName}</h4>
                    <button
                      onClick={() => {
                        setSelectedPatient(null);
                        setPrescriptionForm(prev => ({ ...prev, patientId: '' }));
                      }}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">Patient ID: {selectedPatient.id}</p>
                </div>
              ) : (
                <div>
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search patients by name or ID..."
                      value={patientSearch}
                      onChange={(e) => setPatientSearch(e.target.value)}
                      className="pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none w-full text-sm"
                    />
                  </div>
                  
                  {patientSearch && (
                    <div className="mt-4 space-y-2 max-h-60 overflow-y-auto pr-2">
                      {patients.map((patient) => (
                        <div
                          key={patient.id}
                          onClick={() => selectPatient(patient)}
                          className="p-3 border border-gray-200 rounded-lg hover:bg-medical-50 hover:border-medical-400 cursor-pointer transition-colors"
                        >
                          <p className="font-semibold text-gray-900">{patient.fullName}</p>
                          <p className="text-xs text-gray-500">ID: {patient.id}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Clinical Context</h3>
              <div className="space-y-4">
                <textarea
                  value={prescriptionForm.chiefComplaints}
                  onChange={(e) => setPrescriptionForm(prev => ({ ...prev, chiefComplaints: e.target.value }))}
                  placeholder="Chief Complaints"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none text-sm"
                />
                <textarea
                  value={prescriptionForm.findingsOnExam}
                  onChange={(e) => setPrescriptionForm(prev => ({ ...prev, findingsOnExam: e.target.value }))}
                  placeholder="Findings on Exam"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none text-sm"
                />
                <textarea
                  value={prescriptionForm.advice}
                  onChange={(e) => setPrescriptionForm(prev => ({ ...prev, advice: e.target.value }))}
                  placeholder="Advice"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none text-sm"
                />
                <input
                  type="date"
                  value={prescriptionForm.followUpDate}
                  onChange={(e) => setPrescriptionForm(prev => ({ ...prev, followUpDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none text-sm"
                />
              </div>
            </div>
          </aside>

          <main className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Pill className="w-5 h-5 mr-3 text-medical-600" />
                  Medications
                </h3>
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search & add medications..."
                    value={medicineSearch}
                    onChange={(e) => setMedicineSearch(e.target.value)}
                    className="pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none w-full text-sm"
                  />
                </div>
              </div>

              {medicineSearch && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {medicines.map((medication) => (
                      <div
                        key={medication.id}
                        onClick={() => addMedication(medication)}
                        className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md cursor-pointer hover:bg-medical-50 transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-gray-900">{medication.brandName}</p>
                          <p className="text-xs text-gray-500">{medication.genericName}</p>
                        </div>
                        <Plus className="w-5 h-5 text-medical-600" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {prescriptionForm.medicines.map((medication, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-gray-800">{medication.name}</h4>
                        <p className="text-sm text-gray-500">{medication.genericName}</p>
                      </div>
                      <button
                        onClick={() => removeMedication(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Route</label>
                        <input type="text" value={medication.route} onChange={(e) => updateMedication(index, 'route', e.target.value)} className="w-full p-2 border rounded-md" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Form</label>
                        <input type="text" value={medication.form} onChange={(e) => updateMedication(index, 'form', e.target.value)} className="w-full p-2 border rounded-md" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Dose</label>
                        <input type="number" value={medication.quantityPerDose} onChange={(e) => updateMedication(index, 'quantityPerDose', parseInt(e.target.value))} className="w-full p-2 border rounded-md" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Frequency</label>
                        <input type="text" value={medication.frequency} onChange={(e) => updateMedication(index, 'frequency', e.target.value)} className="w-full p-2 border rounded-md" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Duration</label>
                        <input type="number" value={medication.durationInDays} onChange={(e) => updateMedication(index, 'durationInDays', parseInt(e.target.value))} className="w-full p-2 border rounded-md" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Total Qty</label>
                        <input type="text" value={medication.totalQuantity} onChange={(e) => updateMedication(index, 'totalQuantity', e.target.value)} className="w-full p-2 border rounded-md" />
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Instruction</label>
                      <input type="text" value={medication.fullInstruction} onChange={(e) => updateMedication(index, 'fullInstruction', e.target.value)} className="w-full p-2 border rounded-md" />
                    </div>
                  </div>
                ))}

                {prescriptionForm.medicines.length === 0 && (
                  <div className="text-center py-12 text-gray-500 border-2 border-dashed rounded-lg">
                    <Pill className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-lg font-medium">No medications added</h3>
                    <p className="text-sm">Search for medications to add them to the prescription.</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default EPrescription;