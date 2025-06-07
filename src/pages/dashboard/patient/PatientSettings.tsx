
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { User, Lock, FileText } from 'lucide-react';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  insuranceNumber: z.string().min(5, 'Insurance number is required'),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ProfileForm = z.infer<typeof profileSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;

export default function PatientSettings() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      insuranceNumber: user?.insuranceNumber || '',
    },
  });

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  });

  const onProfileSubmit = async (data: ProfileForm) => {
    setIsLoading(true);
    try {
      // Mock profile update - replace with real API call
      toast({
        title: 'Profile updated successfully',
        description: 'Your information has been saved.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordForm) => {
    setIsLoading(true);
    try {
      // Mock password update - replace with real API call
      toast({
        title: 'Password updated successfully',
        description: 'Your password has been changed.',
      });
      passwordForm.reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update password. Please try again.',
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
            <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
            <p className="text-gray-600">Manage your account information and preferences</p>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="password">
                <Lock className="w-4 h-4 mr-2" />
                Password
              </TabsTrigger>
              <TabsTrigger value="documents">
                <FileText className="w-4 h-4 mr-2" />
                Documents
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        {...profileForm.register('fullName')}
                        className={profileForm.formState.errors.fullName ? 'border-red-500' : ''}
                      />
                      {profileForm.formState.errors.fullName && (
                        <p className="text-sm text-red-500">{profileForm.formState.errors.fullName.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        {...profileForm.register('email')}
                        className={profileForm.formState.errors.email ? 'border-red-500' : ''}
                      />
                      {profileForm.formState.errors.email && (
                        <p className="text-sm text-red-500">{profileForm.formState.errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        {...profileForm.register('phone')}
                        className={profileForm.formState.errors.phone ? 'border-red-500' : ''}
                      />
                      {profileForm.formState.errors.phone && (
                        <p className="text-sm text-red-500">{profileForm.formState.errors.phone.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="insuranceNumber">Insurance Number</Label>
                      <Input
                        id="insuranceNumber"
                        {...profileForm.register('insuranceNumber')}
                        className={profileForm.formState.errors.insuranceNumber ? 'border-red-500' : ''}
                      />
                      {profileForm.formState.errors.insuranceNumber && (
                        <p className="text-sm text-red-500">{profileForm.formState.errors.insuranceNumber.message}</p>
                      )}
                    </div>

                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        {...passwordForm.register('currentPassword')}
                        className={passwordForm.formState.errors.currentPassword ? 'border-red-500' : ''}
                      />
                      {passwordForm.formState.errors.currentPassword && (
                        <p className="text-sm text-red-500">{passwordForm.formState.errors.currentPassword.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        {...passwordForm.register('newPassword')}
                        className={passwordForm.formState.errors.newPassword ? 'border-red-500' : ''}
                      />
                      {passwordForm.formState.errors.newPassword && (
                        <p className="text-sm text-red-500">{passwordForm.formState.errors.newPassword.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        {...passwordForm.register('confirmPassword')}
                        className={passwordForm.formState.errors.confirmPassword ? 'border-red-500' : ''}
                      />
                      {passwordForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-red-500">{passwordForm.formState.errors.confirmPassword.message}</p>
                      )}
                    </div>

                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? 'Updating...' : 'Update Password'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Document Management</CardTitle>
                  <CardDescription>
                    Upload and manage your medical documents and identification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <FileText className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload Government ID</p>
                      <Button variant="outline" size="sm">Choose File</Button>
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <FileText className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload Medical License (if applicable)</p>
                      <Button variant="outline" size="sm">Choose File</Button>
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <FileText className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload Insurance Card</p>
                      <Button variant="outline" size="sm">Choose File</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </Layout>
  );
}
