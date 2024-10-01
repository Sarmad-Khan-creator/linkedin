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
import { SigninFormSchema } from '@/lib/schemas';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignin } from '@/hooks/use-sign-in';
import OAuthForm from './oauth-form';

const SignInForm = () => {
  const { handleSignin } = useSignin();

  const form = useForm<z.infer<typeof SigninFormSchema>>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleAuthSubmit = async ({
    email,
    password,
  }: z.infer<typeof SigninFormSchema>) => {
    try {
      await handleSignin(email, password);

      toast.success('Successfully signed in');
      form.reset();
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

          <Button
            type="submit"
            className="text-white bg-primary-blue hover:bg-primary-blue/80"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : 'Sign In'}
          </Button>
          <p className="text-center">
            No account?{' '}
            <span className="hover:underline">
              <Link href="/auth/sign-up">Sign up</Link>
            </span>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
