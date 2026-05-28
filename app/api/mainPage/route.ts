import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const [rows] = await db.query("SELECT * FROM mainpageview")
    return NextResponse.json(rows)
}

export async function PUT(request: Request) {
    try {
        const body = await request.json()
        const { title, subtitle, content1, content2 } = body

        await db.query(
            "UPDATE mainpageview SET title = ?, subtitle = ?, content1 = ?, content2 = ? WHERE 1",
            [title, subtitle, content1, content2, 1]
        )

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Database error:", error)
        return NextResponse.json(
            { error: String(error) },
            { status: 500 }
        )
    }
}
