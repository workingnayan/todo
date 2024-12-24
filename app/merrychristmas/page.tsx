import { ChristmasGreeting } from './ChristmasGreeting'

export default function MerryChristmasPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-red-700 to-green-700 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 text-center">Merry Christmas!</h1>
            <ChristmasGreeting />
        </div>
    )
}