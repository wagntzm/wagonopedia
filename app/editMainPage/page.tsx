"use client"

import { useState, useEffect } from "react"

function EditSection() {
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        content1: "",
        content2: ""
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        fetch("/api/mainPage")
            .then((res) => res.json())
            .then((data) => {
                const page = data[0]
                setFormData({
                    title: page?.title ?? "",
                    subtitle: page?.subtitle ?? "",
                    content1: page?.content1 ?? "",
                    content2: page?.content2 ?? ""
                })
                setLoading(false)
            })
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            const res = await fetch("/api/mainPage", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                alert("Zmiany zapisane!")
            } else {
                const errorData = await res.json()
                console.error("Save error:", errorData)
                alert(`Błąd: ${errorData.error || "Nieznany błąd"}`)
            }
        } catch (error) {
            console.error(error)
            alert("Błąd sieciowy")
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return <div className="p-6 text-slate-300">Ładowanie...</div>
    }

    return (
        <div className="flex flex-col gap-4 w-full px-8 mt-8 max-w-2xl">
            <div className="bg-slate-800 rounded-md p-6 border border-slate-700 shadow-lg">
                <h1 className="font-bold text-3xl mb-6 text-slate-100">Edytuj stronę główną</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Tytuł
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-300"
                            placeholder="Wprowadź tytuł"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Podtytuł
                        </label>
                        <input
                            type="text"
                            name="subtitle"
                            value={formData.subtitle}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-300"
                            placeholder="Wprowadź podtytuł"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Zawartość 1
                        </label>
                        <textarea
                            name="content1"
                            value={formData.content1}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-300 resize-none"
                            placeholder="Wprowadź zawartość"
                            rows={4}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Zawartość 2
                        </label>
                        <textarea
                            name="content2"
                            value={formData.content2}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-300 resize-none"
                            placeholder="Wprowadź zawartość"
                            rows={4}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full px-6 py-2 bg-amber-600 hover:bg-amber-500 disabled:bg-amber-700 text-white font-bold rounded-md transition-colors"
                    >
                        {saving ? "Zapisywanie..." : "Zapisz zmiany"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default function EditMainPage() {
    return (
        <main className="items-center">
            <EditSection />
        </main>
    )
}