
import React from 'react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className={cn('min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100', className)}>
      {children}
    </div>
  );
}

export function Container({ children, className }: LayoutProps) {
  return (
    <div className={cn('container mx-auto px-4 py-6', className)}>
      {children}
    </div>
  );
}
