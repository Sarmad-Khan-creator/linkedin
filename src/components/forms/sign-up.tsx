import React, { useState } from 'react';
import OTPForm from './otp-form';
import SignUpForm from './signup-form';

const SignUp = () => {
  const [verifying, setVerifying] = useState(false);

  return (
    <div className="w-full">
      {verifying ? <OTPForm /> : <SignUpForm setVerifying={setVerifying} />}
    </div>
  );
};

export default SignUp;
