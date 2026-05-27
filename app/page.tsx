"use client"

import { useState, useEffect } from "react"

function MainSection() {
    const [mainPage, setMainPage] = useState<any[]>([])

    useEffect(() => {
        fetch("/api/mainPage")
            .then((res) => res.json())
            .then((data) => setMainPage(data))
    }, [])

    const page = mainPage[0] // just grab the first row

    return (
        <div className="flex flex-col md:flex-row gap-4 w-full px-8 mt-8">


            <div className="flex-1 min-h-64 bg-neutral-700 rounded-md p-6">
                <div className="block">
                    <h1 className="font-bold text-4xl">{page?.title ?? "..."}</h1>
                    <h2 className="font-medium text-2xl">{page?.subtitle ?? "..."}</h2>
                </div>
                <div className="flex flex-col md:flex-row gap-4 mt-5 text-xl font-normal">
                    <p className="h-full w-full">{page?.content1 ?? "..."}</p>
                    <p className="h-full w-full">{page?.content2 ?? "..."}</p>
                </div>
            </div>


            <div className="w-full md:w-100 min-h-32 bg-neutral-500 rounded-md p-4">
            </div>

        </div>
    )
}

export default function Home() {
    return (
        <main className="items-center">
            <div className="h-100 flex w-full">
                <MainSection />
            </div>
        </main>
    )
}