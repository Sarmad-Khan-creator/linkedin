import Female from '@/illustrations/Female';
import Male from '@/illustrations/Male';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  const { sessionId } = auth();

  if (sessionId) {
    return redirect('/');
  }
  return (
    <main className="h-screen flex">
      <div className="h-full flex-1 flex flex-col gap-y-5 items-center justify-center">
        {children}
      </div>
      <div className="h-full flex-1 flex flex-col items-center justify-center bg-primary-blue">
        <div className="flex gap-3 items-center">
          <Male />
          <Female />
        </div>
        <h1 className="text-2xl text-white w-[500px] text-center">
          Meet with people, find connection and get job of your choice
        </h1>
      </div>
    </main>
  );
};

export default AuthLayout;
