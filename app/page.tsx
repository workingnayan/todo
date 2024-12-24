import Link from 'next/link'
import MerryChristmasPage from "@/app/merrychristmas/page";

export default function Home() {
    return <MerryChristmasPage />
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold mb-6">Welcome to the Todo App</h1>
            <div className="flex flex-col space-y-4">
                <Link href="/todo" className="text-blue-500 hover:underline text-center">
                    Go to Todo List
                </Link>
                <Link href="/merrychristmas" className="text-red-500 hover:underline text-center">
                    Get Your Christmas Greeting!
                </Link>
            </div>
        </main>
    )
}