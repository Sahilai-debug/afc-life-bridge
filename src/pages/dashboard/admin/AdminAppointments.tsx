
'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Container } from '@/components/ui/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AppointmentService } from '@/lib/appointments';
import { Appointment } from '@/types';
import { Calendar, Clock, User, Phone, TrendingUp } from 'lucide-react';

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const allAppointments = AppointmentService.getAllAppointments();
    setAppointments(allAppointments);
  }, []);

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
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const todayAppointments = appointments.filter(apt => 
    apt.date.toDateString() === new Date().toDateString()
  );
  
  const upcomingAppointments = appointments.filter(apt => 
    apt.date > new Date() && apt.status === 'scheduled'
  );

  const aiAssistedAppointments = appointments.filter(apt => apt.type === 'ai-assisted');

  return (
    <Layout>
      <Container>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Appointment Management</h1>
            <p className="text-gray-600">Overview of all appointments in the system</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todayAppointments.length}</div>
                <p className="text-xs text-muted-foreground">appointments today</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
                <p className="text-xs text-muted-foreground">scheduled appointments</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{appointments.length}</div>
                <p className="text-xs text-muted-foreground">all appointments</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Assisted</CardTitle>
                <Phone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{aiAssistedAppointments.length}</div>
                <p className="text-xs text-muted-foreground">AI booked</p>
              </CardContent>
            </Card>
          </div>

          {/* Appointments List */}
          <Card>
            <CardHeader>
              <CardTitle>All Appointments</CardTitle>
              <CardDescription>
                Complete list of appointments across all doctors and patients
              </CardDescription>
            </CardHeader>
            <CardContent>
              {appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{appointment.patientName}</h4>
                          <p className="text-sm text-gray-600">with {appointment.doctorName}</p>
                          <p className="text-sm text-gray-500">{appointment.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{formatDate(appointment.date)}</p>
                          <p className="text-sm text-gray-600">{appointment.time}</p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {appointment.type === 'ai-assisted' && (
                            <span className="flex items-center gap-1 text-purple-600 text-xs bg-purple-50 px-2 py-1 rounded">
                              <Phone className="w-3 h-3" />
                              AI
                            </span>
                          )}
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No appointments found</h3>
                  <p className="text-gray-600">Appointments will appear here once patients start booking.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Container>
    </Layout>
  );
}
