'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import React from 'react';
import VendorsTable from './VendorsTable';

export default function Main() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center px-4 text-center space-y-4">
      <div onClick={() => router.push('/create-vendor')}>
        <Button>Create Vendor</Button>
      </div>
      <VendorsTable />
    </main>
  );
}