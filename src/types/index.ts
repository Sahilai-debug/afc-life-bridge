
export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'patient' | 'doctor' | 'admin';
  phone?: string;
  insuranceNumber?: string;
  medicalLicense?: string;
  governmentId?: string;
  createdAt: Date;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  doctorName: string;
  date: Date;
  time: string;
  description: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'manual' | 'ai-assisted';
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  email: string;
  available: boolean;
}

export type UserRole = 'patient' | 'doctor' | 'admin';
