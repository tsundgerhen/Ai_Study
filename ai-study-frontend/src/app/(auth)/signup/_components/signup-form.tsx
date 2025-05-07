'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '@/app/public/favicon.ico';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Step 1 Schema
const UserInfoSchema = z.object({
    lastName: z.string().min(1, 'Овог оруулна уу'),
    firstName: z.string().min(1, 'Нэр оруулна уу'),
    email: z.string().email('Зөв имэйл хаяг оруулна уу'),
    birthDate: z
        .string()
        .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'MM/DD/YYYY форматтай байх ёстой'),
});

// Step 2 Schema
const OtpSchema = z.object({
    otp: z
        .string()
        .length(4, '4 оронтой байх ёстой') // Ensure OTP is 6 digits
        .regex(/^\d+$/, 'Зөвхөн тоо оруулна уу'),
});

type UserInfoData = z.infer<typeof UserInfoSchema>;
type OtpData = z.infer<typeof OtpSchema>;

export default function SignupForm() {
    const router = useRouter();
    const [step, setStep] = useState<'userInfo' | 'otp'>('userInfo');
    const [userEmail, setUserEmail] = useState('');

    // Step 1 form
    const userInfoForm = useForm<UserInfoData>({
        resolver: zodResolver(UserInfoSchema),
        defaultValues: {
            lastName: '',
            firstName: '',
            email: '',
            birthDate: '',
        },
    });

    // Step 2 form
    const otpForm = useForm<OtpData>({
        resolver: zodResolver(OtpSchema),
        defaultValues: {
            otp: '',  // Ensure OTP is empty on form initialization
        },
    });

    // Reset OTP field when switching to the OTP step
    useEffect(() => {
        if (step === 'otp') {
            otpForm.reset({ otp: '' });  // Clear OTP field on transition to OTP step
        }
    }, [step, otpForm]);

    // Handle Step 1 submit
    const onUserInfoSubmit = async (data: UserInfoData) => {

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup/request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                    fname: data.firstName,
                    lname: data.lastName,
                    birthday: data.birthDate,
                }),
            }
            );

            if (!res.ok) {
                throw new Error('Failed to send user info');
            }

            const responseData = await res.json();
            setUserEmail(data.email);  // Store email for OTP step
            setStep('otp');  // Move to OTP step
        } catch (error) {
            alert('Алдаа гарлаа. Дахин оролдоно уу.');
        }
    };

    // Handle Step 2 submit
    const onOtpSubmit = async (data: OtpData) => {

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userEmail,
                    otp: data.otp,
                }),
            });

            if (!res.ok) {
                throw new Error('Failed to verify OTP');
            }

            const responseData = await res.json();
            alert('Баталгаажуулалт амжилттай!');
            router.push('/login'); // Success message
        } catch (error) {
            console.error('Error during OTP submission:', error);
            alert('Алдаа гарлаа. Дахин оролдоно уу.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-6 w-full max-w-md px-4">
            <Image
                className="dark:invert"
                src={logo}
                alt="Logo"
                width={50}
                height={50}
                priority
            />

            <h2 className="text-3xl font-semibold text-center">
                {step === 'userInfo' ? 'AI study-д бүртгүүлэх' : 'Баталгаажуулах код'}
            </h2>

            {step === 'userInfo' ? (
                <Form {...userInfoForm}>
                    <form
                        onSubmit={userInfoForm.handleSubmit(onUserInfoSubmit)}
                        className="flex flex-col gap-4 w-full"
                    >
                        {/* Name Fields */}
                        <div className="flex flex-col md:flex-row gap-3">
                            <FormField
                                control={userInfoForm.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input placeholder="Овог" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={userInfoForm.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input placeholder="Нэр" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={userInfoForm.control}
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

                        <FormField
                            control={userInfoForm.control}
                            name="birthDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Төрсөн өдөр (MM/DD/YYYY)" maxLength={10} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className={`w-full mt-2 text-lg px-4 py-2 ${userInfoForm.formState.isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                                }`}
                            disabled={userInfoForm.formState.isSubmitting}
                        >
                            {userInfoForm.formState.isSubmitting ? 'Илгээж байна...' : 'Үргэлжлүүлэх'}
                        </Button>

                        <p className="text-sm text-center">
                            Аль хэдийн бүртгэлтэй юу?{' '}
                            <Link href="/login" className="text-blue-500 hover:underline">
                                Нэвтрэх
                            </Link>
                        </p>
                    </form>
                </Form>
            ) : (
                <Form {...otpForm}>
                    <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="w-full flex flex-col gap-4">
                        <p className="text-center text-lg text-gray-500">
                            Баталгаажуулах код {userEmail} хаяг руу илгээгдсэн
                        </p>

                        <div className='flex items-center justify-center'>
                            <FormField
                                control={otpForm.control}
                                name="otp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <InputOTP maxLength={4} inputMode='numeric' {...field} className='gap-3'>
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

                        <Button type="submit" className="w-full text-lg px-4 py-2 cursor-pointer">
                            Баталгаажуулах
                        </Button>

                        <Button
                            variant="ghost"
                            type="button"
                            className="text-lg px-4 py-2 cursor-pointer border border-black"
                            onClick={() => setStep('userInfo')}
                        >
                            Буцах
                        </Button>
                    </form>
                </Form>
            )}
        </div>
    );
}
