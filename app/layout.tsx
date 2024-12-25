import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import Image from 'next/image'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: '🎄 Merry Christmas',
    description: 'A festive Christmas Celebration',
    icons: {
        icon: '/christmas-log.svg',
    },
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <header className="bg-green-800 p-4 flex items-center justify-between">
            <div className="flex items-center">
                <Image
                    src="/christmas-logo.svg"
                    alt="Christmas Logo"
                    width={50}
                    height={50}
                />
                <h1 className="text-white text-2xl ml-4">Merry Christmas</h1>
            </div>
        </header>
        <main>{children}</main>
        </body>
        </html>
    )
}

