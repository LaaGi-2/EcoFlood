import { NextResponse } from "next/server";
import { db, dbInitPromis } from "@/lib/connect-db";
import ContextApproveReportDisaster from "@/interface/context-approve-report-disaster";

export async function PATCH(request: Request, context: ContextApproveReportDisaster) {
    try {
        const { reportId } = await context.params;
        const id = parseInt(reportId, 10);

        if(isNaN(id)) {
            return NextResponse.json({ error: "ID laporan tidak valid! "+context.params.reportId }, { status: 400 });
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