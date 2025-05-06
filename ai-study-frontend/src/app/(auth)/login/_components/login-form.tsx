import React from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'

export default function LoginForm() {
    return (
        <div className='flex flex-col items-center justify-center'>
            <Image
                className="dark:invert"
                src="/next.svg"
                alt="Next.js logo"
                width={180}
                height={38}
                priority
            />
            <div>
                <div>AI study-д нэвтрэх</div>
                <Input />
            </div>
        </div>
    )
}
