import { NextResponse } from "next/server";
import { db, dbInitPromis } from "@/lib/connect-db";
interface ContextApproveReportDisaster {
    params: Promise<{ reportId: string }>
}

export async function PATCH(request: Request, context: ContextApproveReportDisaster) {
    try {
        const { reportId } = await context.params;
        const id = parseInt(reportId, 10);

        const formData = await request.formData();
        const secretTokenKey = formData.get("secretTokenKey");
        const token = secretTokenKey as string;

        if(token != process.env.SECRET_TOKEN_KEY) {
            return NextResponse.json({
                error: "Anda tidak punya izin akses!",
            }, { status: 400 });
        }

        if(isNaN(id)) {
            return NextResponse.json({ error: "ID laporan tidak valid! " }, { status: 400 });
        }
        
        await dbInitPromis;

        const approveReportDisaster = await db.execute({
            sql: `UPDATE reports SET status=? WHERE id=?`,
            args: ["success", id]
        });

        return NextResponse.json(approveReportDisaster, { status: 200 });

    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.json({
            error: "Gagal menyetujui laporan!"
        }, { status: 500 });
    }
}