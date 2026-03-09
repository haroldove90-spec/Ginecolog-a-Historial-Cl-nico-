export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  dob: string;
  phone: string;
  bloodType: string;
  allergies: string[];
  status: 'active' | 'inactive';
}

export interface Pregnancy {
  id: string;
  patientId: string;
  lmp: string; // Last Menstrual Period
  edd: string; // Estimated Date of Delivery
  status: 'active' | 'delivered' | 'terminated';
  riskLevel: 'low' | 'medium' | 'high';
  gravida: number;
  para: number;
  abortions: number;
}

export interface PrenatalControl {
  id: string;
  pregnancyId: string;
  date: string;
  gestationalAgeWeeks: number;
  gestationalAgeDays: number;
  weightKg: number;
  bloodPressureSys: number;
  bloodPressureDia: number;
  fundalHeightCm: number;
  fetalHeartRateBpm: number;
  notes: string;
}

export interface Document {
  id: string;
  patientId: string;
  referenceId?: string;
  type: 'ultrasound' | 'lab_result' | 'consent' | 'other';
  name: string;
  date: string;
  url: string;
}

export interface GynecologicalConsultation {
  id: string;
  patientId: string;
  date: string;
  reason: string;
  diagnosis: string;
  treatment: string;
  nextRevision: string;
  notes: string;
}
