
'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Container } from '@/components/ui/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AppointmentService } from '@/lib/appointments';
import { useAuth } from '@/contexts/AuthContext';
import { Appointment } from '@/types';
import { Calendar, Clock, User } from 'lucide-react';
import Link from 'next/link';

export default function PatientCalendar() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (user) {
      const userAppointments = AppointmentService.getAppointmentsByPatient(user.id);
      setAppointments(userAppointments);
    }
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'cancelled': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Layout>
      <Container>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
              <p className="text-gray-600">View and manage your scheduled appointments</p>
            </div>
            <Link href="/dashboard/patient/book-appointment">
              <Button>
                <Calendar className="w-4 h-4 mr-2" />
                Book New Appointment
              </Button>
            </Link>
          </div>

          {appointments.length > 0 ? (
            <div className="grid gap-6">
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5 text-blue-600" />
                        {appointment.doctorName}
                      </CardTitle>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                    <CardDescription className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(appointment.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {appointment.time}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Description:</h4>
                        <p className="text-gray-600">{appointment.description}</p>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t">
                        <span className="text-sm text-gray-500">
                          Booking type: {appointment.type === 'ai-assisted' ? 'AI Assistant' : 'Manual'}
                        </span>
                        {appointment.status === 'scheduled' && (
                          <div className="space-x-2">
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                            <Button variant="outline" size="sm">
                              Cancel
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No appointments scheduled</h3>
                <p className="text-gray-600 mb-6">
                  You don't have any appointments yet. Book your first appointment to get started.
                </p>
                <Link href="/dashboard/patient/book-appointment">
                  <Button>Book Your First Appointment</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </Container>
    </Layout>
  );
}
