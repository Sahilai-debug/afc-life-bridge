
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Layout, Container } from '@/components/ui/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppointmentService } from '@/lib/appointments';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Calendar, Phone } from 'lucide-react';

const appointmentSchema = z.object({
  doctorId: z.string().min(1, 'Please select a doctor'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  description: z.string().min(10, 'Please provide a description (minimum 10 characters)'),
});

const aiCallbackSchema = z.object({
  phoneNumber: z.string().min(10, 'Please enter a valid phone number'),
});

type AppointmentForm = z.infer<typeof appointmentSchema>;
type AICallbackForm = z.infer<typeof aiCallbackSchema>;

export default function BookAppointment() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [doctors] = useState(AppointmentService.getDoctors());

  const appointmentForm = useForm<AppointmentForm>({
    resolver: zodResolver(appointmentSchema),
  });

  const aiForm = useForm<AICallbackForm>({
    resolver: zodResolver(aiCallbackSchema),
  });

  const onAppointmentSubmit = async (data: AppointmentForm) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const doctor = doctors.find(d => d.id === data.doctorId);
      const appointment = AppointmentService.bookAppointment({
        patientId: user.id,
        doctorId: data.doctorId,
        patientName: user.fullName,
        doctorName: doctor?.name || 'Unknown Doctor',
        date: new Date(data.date),
        time: data.time,
        description: data.description,
        status: 'scheduled',
        type: 'manual'
      });

      toast({
        title: 'Appointment booked successfully!',
        description: `Your appointment with ${doctor?.name} has been scheduled.`,
      });

      appointmentForm.reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to book appointment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onAICallbackSubmit = async (data: AICallbackForm) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const success = await AppointmentService.requestAICallback(data.phoneNumber, user.id);
      
      if (success) {
        toast({
          title: 'Callback requested successfully!',
          description: 'Our AI assistant will call you within 15 minutes to help book your appointment.',
        });
        aiForm.reset();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to request callback. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Container>
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Book an Appointment</h1>
            <p className="text-gray-600">Schedule your visit with our healthcare providers</p>
          </div>

          <Tabs defaultValue="manual" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual">
                <Calendar className="w-4 h-4 mr-2" />
                Manual Booking
              </TabsTrigger>
              <TabsTrigger value="ai">
                <Phone className="w-4 h-4 mr-2" />
                AI Assistant
              </TabsTrigger>
            </TabsList>

            <TabsContent value="manual">
              <Card>
                <CardHeader>
                  <CardTitle>Manual Appointment Booking</CardTitle>
                  <CardDescription>
                    Fill out the form below to schedule your appointment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={appointmentForm.handleSubmit(onAppointmentSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="doctorId">Select Doctor</Label>
                      <Select onValueChange={(value) => appointmentForm.setValue('doctorId', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a doctor" />
                        </SelectTrigger>
                        <SelectContent>
                          {doctors.map((doctor) => (
                            <SelectItem key={doctor.id} value={doctor.id}>
                              {doctor.name} - {doctor.specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {appointmentForm.formState.errors.doctorId && (
                        <p className="text-sm text-red-500">{appointmentForm.formState.errors.doctorId.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          {...appointmentForm.register('date')}
                          className={appointmentForm.formState.errors.date ? 'border-red-500' : ''}
                        />
                        {appointmentForm.formState.errors.date && (
                          <p className="text-sm text-red-500">{appointmentForm.formState.errors.date.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="time">Time</Label>
                        <Select onValueChange={(value) => appointmentForm.setValue('time', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                            <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                            <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                            <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                            <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                            <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                        {appointmentForm.formState.errors.time && (
                          <p className="text-sm text-red-500">{appointmentForm.formState.errors.time.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Briefly describe the reason for your visit..."
                        {...appointmentForm.register('description')}
                        className={appointmentForm.formState.errors.description ? 'border-red-500' : ''}
                      />
                      {appointmentForm.formState.errors.description && (
                        <p className="text-sm text-red-500">{appointmentForm.formState.errors.description.message}</p>
                      )}
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Booking appointment...' : 'Book Appointment'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai">
              <Card>
                <CardHeader>
                  <CardTitle>AI Assistant Booking</CardTitle>
                  <CardDescription>
                    Request a callback from our AI assistant to help you book an appointment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={aiForm.handleSubmit(onAICallbackSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="(555) 123-4567"
                        {...aiForm.register('phoneNumber')}
                        className={aiForm.formState.errors.phoneNumber ? 'border-red-500' : ''}
                      />
                      {aiForm.formState.errors.phoneNumber && (
                        <p className="text-sm text-red-500">{aiForm.formState.errors.phoneNumber.message}</p>
                      )}
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">How it works:</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Our AI assistant will call you within 15 minutes</li>
                        <li>• Discuss your needs and preferred appointment times</li>
                        <li>• Automatically book and confirm your appointment</li>
                        <li>• Receive email confirmation with all details</li>
                      </ul>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Requesting callback...' : 'Request AI Callback'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </Layout>
  );
}
