export interface Patient {
  id: string;
  fullName: string;
  dateOfBirth: string;
}

export interface Medication {
  id: string;
  brandName: string;
  genericName: string;
}

export interface PrescriptionMedication {
  medicineId: string;
  name: string;
  genericName: string;
  route: string;
  form: string;
  quantityPerDose: number;
  frequency: string;
  durationInDays: number;
  fullInstruction: string;
  totalQuantity: string;
}

export interface PrescriptionForm {
  patientId: string;
  chiefComplaints: string;
  findingsOnExam: string;
  advice: string;
  followUpDate?: string;
  medicines: PrescriptionMedication[];
}

export interface Prescription extends PrescriptionForm {
  id: string;
  createdAt: string;
  patient: Patient;
  status: string;
}
