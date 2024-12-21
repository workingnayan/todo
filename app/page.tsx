import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Todo App</h1>
      <Link href="/todo" className="text-blue-500 hover:underline">
        Go to Todo List
      </Link>
    </main>
  )
}