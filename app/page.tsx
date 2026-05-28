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

    const graphicSrc =
        typeof page?.graphic === "string"
            ? page.graphic
            : page?.graphic?.data
                ? String.fromCharCode(...page.graphic.data)
                : null

    return (
        <div className="flex flex-col md:flex-row gap-4 w-full px-8 mt-8">


            <div className="flex-1 min-h-64 bg-slate-800 rounded-md p-6 border border-slate-700 shadow-lg">
                <div className="block">
                    <h1 className="font-bold text-4xl">{page?.title ?? "..."}</h1>
                    <h2 className="font-medium text-2xl">{page?.subtitle ?? "..."}</h2>
                </div>
                <div className="flex flex-col md:flex-row gap-4 mt-5 text-xl font-normal">
                    <p className="h-full w-full">{page?.content1 ?? "..."}</p>
                    <p className="h-full w-full">{page?.content2 ?? "..."}</p>
                </div>
            </div>


            <div className="w-full md:w-100 min-h-32 bg-slate-700 rounded-md p-4 flex items-center justify-center overflow-hidden border border-slate-600 shadow-lg">
                {graphicSrc && (
                    <img
                        src={graphicSrc}
                        alt={page?.title ?? ""}
                        className="max-w-full max-h-full object-contain"
                    />
                )}
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