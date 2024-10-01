'use client';
import React from 'react';
import SignInForm from '../forms/signin-form';
import SignUp from '../forms/sign-up';

type Props = {
  type: 'sign-in' | 'sign-up';
};

const Auth = ({ type }: Props) => {
  return <div className='flex items-center justify-center'>{type === 'sign-in' ? <SignInForm /> : <SignUp />}</div>;
};

export default Auth;
