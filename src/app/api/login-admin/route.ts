import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const username = formData.get("username");
        const password = formData.get("password");

        // expected username and password admin
        const expectedUsnAdmin = process.env.USERNAME_ADMIN;
        const expectedPassAdmin = process.env.PASSWORD_ADMIN;
        const secretTokenKey = process.env.SECRET_TOKEN_KEY;

        if (!username || !password) {
            return NextResponse.json({
                error: "Semua inputan wajib diisi!",
            }, { status: 400 });
        }

        const usnValue = username as string;
        const passValue = password as string;

        if (usnValue != expectedUsnAdmin || passValue != expectedPassAdmin) {
            return NextResponse.json({
                error: "Kredensial tidak valid!",
            }, { status: 400 });
        }
        
        return NextResponse.json({
            message: "Berhasil login sebagai admin!",
            secretTokenKey: secretTokenKey
        }, { status: 200 });
    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.json({
            error: "Gagal melakukan login sebagai admin"
        }, { status: 500 })
    }
}
