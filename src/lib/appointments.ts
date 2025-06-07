
import { Appointment, Doctor } from '@/types';

export class AppointmentService {
  private static appointments: Appointment[] = [
    {
      id: '1',
      patientId: '1',
      doctorId: 'dr1',
      patientName: 'John Patient',
      doctorName: 'Dr. Sarah Johnson',
      date: new Date(2024, 5, 15),
      time: '10:00 AM',
      description: 'Regular checkup',
      status: 'scheduled',
      type: 'manual'
    }
  ];

  private static doctors: Doctor[] = [
    {
      id: 'dr1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Internal Medicine',
      email: 'sarah.johnson@afc.com',
      available: true
    },
    {
      id: 'dr2',
      name: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      email: 'michael.chen@afc.com',
      available: true
    },
    {
      id: 'dr3',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Psychiatry',
      email: 'emily.rodriguez@afc.com',
      available: true
    }
  ];

  static getAllAppointments(): Appointment[] {
    return this.appointments;
  }

  static getAppointmentsByPatient(patientId: string): Appointment[] {
    return this.appointments.filter(apt => apt.patientId === patientId);
  }

  static getAppointmentsByDoctor(doctorId: string): Appointment[] {
    return this.appointments.filter(apt => apt.doctorId === doctorId);
  }

  static getDoctors(): Doctor[] {
    return this.doctors;
  }

  static bookAppointment(appointment: Omit<Appointment, 'id'>): Appointment {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString()
    };
    this.appointments.push(newAppointment);
    return newAppointment;
  }

  static async requestAICallback(phoneNumber: string, patientId: string): Promise<boolean> {
    // Mock AI callback request
    console.log(`AI callback requested for ${phoneNumber}`);
    
    // Simulate auto-booking
    const autoAppointment: Appointment = {
      id: Date.now().toString(),
      patientId,
      doctorId: 'dr1',
      patientName: 'Auto-booked Patient',
      doctorName: 'Dr. Sarah Johnson',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
      time: '2:00 PM',
      description: 'AI-assisted booking consultation',
      status: 'scheduled',
      type: 'ai-assisted'
    };
    
    this.appointments.push(autoAppointment);
    return true;
  }
}
