import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: '🎉 Happy New Year',
    description: 'A New Year Celebration',
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
        <header className="bg-red-800 p-4 flex items-center justify-between">
            <div className="flex items-center">
                🎉 <h1 className="text-white text-2xl ml-4 content-center">Happy New Year</h1>
            </div>
        </header>
        <main>{children}</main>
        </body>
        </html>
    )
}

