'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: '/', label: 'Нүүр' },
        { href: '/about', label: 'Бидний тухай' },
        { href: '/contact', label: 'Холбоо барих' },
    ];

    return (
        <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b shadow-sm z-50">
            <div className="flex items-center justify-between px-6 h-full">
                {/* Logo or title */}
                <Link href="/" className="text-xl font-semibold">
                    AI Study
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-6 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-gray-700 hover:text-black transition"
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* Avatar */}
                    <Avatar className="ml-4 cursor-pointer">
                        <AvatarImage src="/avatar.png" alt="User" />
                        <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                </nav>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-xl font-semibold">Цэс</span>
                                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                            <div className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-lg font-medium hover:underline"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
