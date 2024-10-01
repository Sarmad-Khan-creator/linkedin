'use client';

import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';

export const useSignup = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const handleSignup = async (emailAddress: string, password: string) => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });
    } catch (err) {
      if (isClerkAPIResponseError(err)) throw err.errors[0].message;
    }
  };

  const handleVerify = async (code: string) => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.push('/');
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) throw err.errors[0].message;
    }
  };

  return {
    handleSignup,
    handleVerify,
  };
};
