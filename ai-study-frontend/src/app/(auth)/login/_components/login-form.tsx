'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import logo from '@/app/public/favicon.ico';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Step schemas
const emailSchema = z.object({
    email: z.string().email({ message: 'Зөв э-мейл хаяг оруулна уу' }),
});

const otpSchema = z.object({
    otp: z.string().length(4, { message: '4 оронтой код оруулна уу' }),
});

type EmailFormData = z.infer<typeof emailSchema>;
type OtpFormData = z.infer<typeof otpSchema>;

export default function OTPLoginForm() {
    const router = useRouter();
    const [step, setStep] = useState<'email' | 'otp'>('email');
    const [userEmail, setUserEmail] = useState<string>('');
    const api = process.env.NEXT_PUBLIC_API_URL;


    console.log("api", api);

    const emailForm = useForm<EmailFormData>({
        resolver: zodResolver(emailSchema),
        defaultValues: { email: '' },
    });

    const otpForm = useForm<OtpFormData>({
        resolver: zodResolver(otpSchema),
        defaultValues: { otp: '' },
    });

    const handleEmailSubmit = async (data: EmailFormData) => {
        try {
            const res = await fetch(`${api}/auth/login/request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: data.email }),

            });

            const result = await res.json();

            if (res.ok) {
                setUserEmail(data.email);
                setStep('otp');
            } else {
                alert(result.message || 'Алдаа гарлаа. Дахин оролдоно уу.');
            }
        } catch (error) {
            console.error('Error during email submission:', error);
            alert('Сүлжээний алдаа. Дахин оролдоно уу.');
        }

    };

    const handleOtpSubmit = async (data: OtpFormData) => {
        try {
            const res = await fetch(`${api}/auth/login/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userEmail, otp: data.otp }),
            });

            const result = await res.json();

            if (res.ok) {
                alert(`Амжилттай нэвтэрлээ! (${result.access_token}`);
                // Redirect to the main page or perform any other action
                localStorage.setItem('access_token', result.access_token);
                router.push('/');
            } else {
                alert(result.message || 'Алдаа гарлаа. Дахин оролдоно уу.');
            }
        } catch (error) {
            console.error('Error during OTP submission:', error);
            alert('Сүлжээний алдаа. Дахин оролдоно уу.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-8 w-full max-w-sm">
            <Image className="dark:invert" src={logo} alt="logo" width={50} height={50} priority />

            {step === 'email' ? (
                <Form {...emailForm}>
                    <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="w-full flex flex-col gap-4">
                        <h2 className="text-3xl font-semibold text-center">AI study-д нэвтрэх</h2>

                        <FormField
                            control={emailForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="email" placeholder="Э-мейлээ оруулна уу..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full text-lg px-4 py-2 cursor-pointer"
                            disabled={emailForm.formState.isSubmitting}
                        >
                            {emailForm.formState.isSubmitting ? 'Илгээж байна...' : 'Үргэлжлүүлэх'}
                        </Button>
                    </form>
                </Form>
            ) : (
                <Form {...otpForm}>
                    <form onSubmit={otpForm.handleSubmit(handleOtpSubmit)} className="w-full flex flex-col gap-4">
                        <h2 className="text-3xl font-semibold text-center">Баталгаажуулах код</h2>
                        <p className="text-lg text-center text-neutral-500">Таны {userEmail} хаяг руу код илгээгдсэн</p>

                        <div className='flex items-center justify-center'>
                            <FormField
                                control={otpForm.control}
                                name="otp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <InputOTP maxLength={4} {...field} className='3' inputMode='numeric'>
                                                <InputOTPGroup className=''>
                                                    {Array.from({ length: 4 }).map((_, i) => (
                                                        <InputOTPSlot key={i} index={i} className='h-20 w-16 text-2xl border-2 text-center' />
                                                    ))}
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full text-lg px-4 py-2 cursor-pointer"
                            disabled={otpForm.formState.isSubmitting}
                        >
                            {otpForm.formState.isSubmitting ? 'Нэвтэрч байна...' : 'Нэвтрэх'}
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            className="text-lg text-black border border-black px-4 py-2 cursor-pointer"
                            onClick={() => setStep('email')}
                        >
                            Буцах
                        </Button>
                    </form>
                </Form>
            )}

            <div className="text-center text-sm flex flex-col gap-2 font-normal px-1.5">
                <div>
                    Хаяг байхгүй юу?{' '}
                    <Link href="/signup" className="text-blue-500 hover:underline">
                        Бүртгүүлэх
                    </Link>
                </div>
                <div className="my-2 border-t border-neutral-300"></div>
                <div>
                    Нууц үг мартсан уу?{' '}
                    <Link href="/forgetPassword" className="text-blue-500 hover:underline">
                        Энд дар
                    </Link>
                </div>
            </div>
        </div>
    );
}
