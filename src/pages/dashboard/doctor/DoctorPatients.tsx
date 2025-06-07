
'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Container } from '@/components/ui/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthService } from '@/lib/auth';
import { AppointmentService } from '@/lib/appointments';
import { User, Appointment } from '@/types';
import { Users, Calendar, Phone, FileText } from 'lucide-react';

export default function DoctorPatients() {
  const [patients, setPatients] = useState<User[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const allUsers = AuthService.getAllUsers();
    const patientUsers = allUsers.filter(user => user.role === 'patient');
    setPatients(patientUsers);
    
    const allAppointments = AppointmentService.getAllAppointments();
    setAppointments(allAppointments);
  }, []);

  const getPatientAppointmentHistory = (patientId: string) => {
    return appointments.filter(apt => apt.patientId === patientId);
  };

  const getLastAppointment = (patientId: string) => {
    const patientAppointments = getPatientAppointmentHistory(patientId);
    return patientAppointments
      .filter(apt => apt.status === 'completed')
      .sort((a, b) => b.date.getTime() - a.date.getTime())[0];
  };

  const getNextAppointment = (patientId: string) => {
    const patientAppointments = getPatientAppointmentHistory(patientId);
    return patientAppointments
      .filter(apt => apt.status === 'scheduled' && apt.date > new Date())
      .sort((a, b) => a.date.getTime() - b.date.getTime())[0];
  };

  return (
    <Layout>
      <Container>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Patients</h1>
            <p className="text-gray-600">View patient information and appointment history</p>
          </div>

          {patients.length > 0 ? (
            <div className="grid gap-6">
              {patients.map((patient) => {
                const appointmentHistory = getPatientAppointmentHistory(patient.id);
                const lastAppointment = getLastAppointment(patient.id);
                const nextAppointment = getNextAppointment(patient.id);

                return (
                  <Card key={patient.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-blue-600" />
                          {patient.fullName}
                        </CardTitle>
                        <span className="text-sm text-gray-500">
                          Patient since {patient.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                      <CardDescription className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {patient.phone || 'No phone'}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          Insurance: {patient.insuranceNumber || 'Not provided'}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900">Contact Information</h4>
                          <p className="text-sm text-gray-600">{patient.email}</p>
                          <p className="text-sm text-gray-600">{patient.phone || 'No phone number'}</p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900">Last Appointment</h4>
                          {lastAppointment ? (
                            <div>
                              <p className="text-sm text-gray-600">
                                {lastAppointment.date.toLocaleDateString()} at {lastAppointment.time}
                              </p>
                              <p className="text-sm text-gray-500">{lastAppointment.description}</p>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">No previous appointments</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900">Next Appointment</h4>
                          {nextAppointment ? (
                            <div>
                              <p className="text-sm text-blue-600 font-medium">
                                {nextAppointment.date.toLocaleDateString()} at {nextAppointment.time}
                              </p>
                              <p className="text-sm text-gray-500">{nextAppointment.description}</p>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">No upcoming appointments</p>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Total appointments: {appointmentHistory.length}
                          </span>
                          <span className="text-sm text-gray-600">
                            Insurance: {patient.insuranceNumber || 'Not provided'}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No patients yet</h3>
                <p className="text-gray-600">
                  Patients will appear here once they book appointments with you.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </Container>
    </Layout>
  );
}
