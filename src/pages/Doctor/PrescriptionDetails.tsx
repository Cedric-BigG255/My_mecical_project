import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { apiClient } from '../../utils/api';
import { Prescription } from '../../types/prescription';
import { Loader, AlertTriangle, User, Calendar, Stethoscope, Pill, Printer } from 'lucide-react';

const PrescriptionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [prescription, setPrescription] = useState<Prescription | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrescriptionDetails = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/prescriptions/${id}`);
        if (response.success) {
          setPrescription(response.data);
        } else {
          setError(response.message || 'Failed to fetch prescription details.');
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'An error occurred while fetching details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPrescriptionDetails();
    }
  }, [id]);

  const InfoCard: React.FC<{ title: string; children: React.ReactNode; icon: React.ElementType }> = ({ title, children, icon: Icon }) => (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Icon className="w-5 h-5 mr-3 text-medical-600" />
        {title}
      </h3>
      <div className="space-y-3 text-sm">{children}</div>
    </div>
  );

  const DetailItem: React.FC<{ label: string; value?: string | null }> = ({ label, value }) => (
    value ? <div>
      <p className="font-medium text-gray-500">{label}</p>
      <p className="text-gray-800">{value}</p>
    </div> : null
  );

  if (loading) {
    return (
      <Layout title="Prescription Details">
        <div className="flex justify-center items-center h-64">
          <Loader className="w-8 h-8 animate-spin text-medical-600" />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Error">
        <div className="max-w-2xl mx-auto mt-10 bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!prescription) {
    return <Layout title="Not Found"><div className="text-center py-10"><p>Prescription not found.</p></div></Layout>;
  }

  return (
    <Layout title="Prescription Details">
      <div className="max-w-5xl mx-auto space-y-8 p-4">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Prescription Details</h1>
            <p className="text-gray-500 mt-1">ID: {prescription.id}</p>
          </div>
          <button
            onClick={() => window.print()}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-medical-600 text-white rounded-lg text-sm font-medium hover:bg-medical-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-medical-500"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print Prescription
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <InfoCard title="Patient Information" icon={User}>
              <DetailItem label="Name" value={prescription.patient.fullName} />
              <DetailItem label="Patient ID" value={prescription.patientId} />
            </InfoCard>

            <InfoCard title="Issuing Details" icon={Calendar}>
              <DetailItem label="Issued On" value={new Date(prescription.createdAt).toLocaleString()} />
              <DetailItem label="Status" value={prescription.status} />
              <DetailItem label="Follow-up Date" value={prescription.followUpDate ? new Date(prescription.followUpDate).toLocaleDateString() : 'N/A'} />
            </InfoCard>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <InfoCard title="Clinical Information" icon={Stethoscope}>
              <DetailItem label="Chief Complaints" value={prescription.chiefComplaints} />
              <DetailItem label="Findings on Exam" value={prescription.findingsOnExam} />
              <DetailItem label="Advice" value={prescription.advice} />
            </InfoCard>

            <InfoCard title="Medications" icon={Pill}>
              <div className="space-y-4">
                {prescription.medicines.map((med, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-gray-50">
                    <p className="font-bold text-lg text-medical-700">{med.name}</p>
                    <p className="text-sm text-gray-600 mb-2">{med.genericName}</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                      <p><span className="font-medium text-gray-500">Route:</span> {med.route}</p>
                      <p><span className="font-medium text-gray-500">Form:</span> {med.form}</p>
                      <p><span className="font-medium text-gray-500">Dose:</span> {med.quantityPerDose}</p>
                      <p><span className="font-medium text-gray-500">Frequency:</span> {med.frequency}</p>
                      <p><span className="font-medium text-gray-500">Duration:</span> {med.durationInDays} days</p>
                      <p><span className="font-medium text-gray-500">Total:</span> {med.totalQuantity}</p>
                    </div>
                    <p className="mt-3 text-sm bg-blue-50 p-3 rounded-md"><span className="font-semibold text-blue-800">Instruction:</span> {med.fullInstruction}</p>
                  </div>
                ))}
              </div>
            </InfoCard>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrescriptionDetails;
