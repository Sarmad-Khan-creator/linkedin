'use client';

import { useSignIn } from '@clerk/nextjs';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { useRouter } from 'next/navigation';

export const useSignin = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const handleSignin = async (email: string, password: string) => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push('/');
      } else {
        // console.error("Error in Sign In",JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) throw err.errors[0].message;
    }
  };

  return {
    handleSignin,
  };
};
