'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import React from 'react';
import VendorsTable from './VendorsTable';

export default function Main() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center px-4 text-center space-y-4">
      <div onClick={() => router.push('/vendor/create')}>
        <Button>Create Vendor</Button>
      </div>
      <p className='text-sm font-medium'>To perform any action you need to login.</p>
      <VendorsTable />
    </main>
  );
}