import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { z } from 'zod';
import { SignupFormSchema } from '@/lib/schemas';
import { useSignup } from '@/hooks/use-sign-up';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import OAuthForm from './oauth-form';

interface SignUpFormProps {
  setVerifying: (verifying: boolean) => void;
}

const SignUpForm = ({ setVerifying }: SignUpFormProps) => {
  const { handleSignup } = useSignup();

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleAuthSubmit = async ({
    email,
    password,
    confirmPassword,
  }: z.infer<typeof SignupFormSchema>) => {
    try {
      setVerifying(false);
      if (password !== confirmPassword) {
        toast.error('Password do not match');

        return;
      }
      await handleSignup(email, password);

      toast.success('Registration successful. Please verify your email.');
      form.reset();
      setVerifying(true);
    } catch (error) {
      toast.error(error as string);
    }
  };

  const isSubmitting = form.formState.isSubmitting;
  return (
    <div className="flex flex-col items-start gap-y-5 w-[450px]">
      <OAuthForm />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleAuthSubmit)}
          className="w-full flex flex-col gap-3"
        >
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="border-gray-400 focus-visible:border-gray-800"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="border-gray-400 focus-visible:border-gray-800"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    className="border-gray-400 focus-visible:border-gray-800"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="text-white bg-primary-blue hover:bg-primary-blue/80"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : 'Sign Up'}
          </Button>
          <p className="text-center">
            Already account?{' '}
            <span className="hover:underline">
              <Link href="/auth/sign-in">Sign in</Link>
            </span>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
