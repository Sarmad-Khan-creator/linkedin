import React from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { OTPSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignup } from '@/hooks/use-sign-up';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { LinkedInLogoIcon } from '@radix-ui/react-icons';

const OTPForm = () => {
  const { handleVerify } = useSignup();

  const form = useForm<z.infer<typeof OTPSchema>>({
    mode: 'onSubmit',
    resolver: zodResolver(OTPSchema),
    defaultValues: { otp: '' },
  });

  const handleOtpSubmit = async (values: z.infer<typeof OTPSchema>) => {
    try {
      await handleVerify(values.otp);
    } catch (error) {
      toast.error(error as string);
    }
  };

  const isSubmitting = form.formState.isSubmitting;
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-start justify-center">
        <div className="flex gap-2 items-center">
          <LinkedInLogoIcon color="#006699" width={45} height={45} />
          <h2 className="text-primary-blue text-2xl font-bold">LINKEDIN</h2>
        </div>
        <p className="text-muted-foreground text-lg">
          Enter the code sent to your email
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleOtpSubmit)}
            className="w-[450px]"
          >
            <FormField
              name="otp"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-5 w-full h-10 text-lg text-white bg-primary-blue hover:bg-primary-blue/80"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : 'Verify'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default OTPForm;
