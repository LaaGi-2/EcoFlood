import { PrismaClient } from "@prisma/client"

// membuat fungsi untuk koneksi ke prisma
const prismaClientSingleton = () => {
    return new PrismaClient()
}

// mengakses penyimpanan global milik nodejs
let globalForPrisma = globalThis

// didalam variabel prisma berisi globalForPrisma.prisma, jika tidak ada maka buat koneksi baru
const prisma = globalForPrisma ?? prismaClientSingleton()

// jika tidak dalam mode production, globalForPrisma.prisma berisi variabel prisma berupa koneksi ke prisma
if(process.env.NODE_ENV !== "production") globalForPrisma = prisma

export default prisma