import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';

const SSOCallback = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-y-5">
        <Loader2 size={30} className="animate-spin" />
        <p className="text-lg text-muted-foreground">
          You are being redirected to homepage
        </p>
      </div>
      <AuthenticateWithRedirectCallback />
    </>
  );
};

export default SSOCallback;
