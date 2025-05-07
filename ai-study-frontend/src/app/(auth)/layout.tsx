import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Auth",
    description: "Auth",
};

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex items-center justify-center min-w-6xl min-h-screen">
            {children}
        </div>
    );
}