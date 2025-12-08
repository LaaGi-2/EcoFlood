import { fileToBase64 } from "@/helper/image-converter";
import cloudinary from "@/lib/cloudinary";
import { db, dbInitPromis } from "@/lib/connect-db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbInitPromis;
        const reports = await db.execute(`SELECT * FROM reports`);
        return NextResponse.json(reports.rows, { status: 200 });
    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.json({ error: "Gagal mengambil data laporan." }, { status: 500 });
    }
}
export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const latitude = formData.get('latitude');
        const longitude = formData.get('longitude');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl') as File | null;

        if (!latitude || !longitude || !description || !imageUrl) {
            return NextResponse.json({
                error: "Semua data wajib diisi!\nlatitude:" + latitude + " \nlongitude:"  + longitude + "\ndescription: " + description + "\nimageUrl" + imageUrl,
            }, { status: 400 });
        }

        const base64Image = await fileToBase64(imageUrl);

        const uploadImage = await cloudinary.uploader.upload(`data:${imageUrl.type};base64,${base64Image}`, {
            folder: "ecoflood_reports",
            resource_type: "image",
            quality: "auto"
        });

        const latValue = parseFloat(latitude as string);
        const lngValue = parseFloat(longitude as string);
        const descValue = description as string;
        const url = uploadImage.secure_url;
        
        await dbInitPromis;

        const newReport = await db.execute({
            sql: `INSERT INTO reports (latitude, longitude, description, imageUrl, status, createdAt)  
            VALUES (?, ?, ?, ?, ?, ?); `,
            args: [latValue, lngValue, descValue, url, 'pending', Date.now()]
        });

        return NextResponse.json(newReport, { status: 201 });
    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.json({ error: "Gagal membuat data laporan." }, { status: 500 });
    }
}