import { Client } from '@libsql/client'; // Import hanya tipe Client

const CREATE_REPORT_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS reports(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    description TEXT,
    imageUrl TEXT,
    status TEXT CHECK(status IN ('pending', 'success')) NOT NULL,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);
`;
 
async function initializedDatabase(db: Client) {
    console.log("Memeriksa dan menginisialisasi skema database...");
    try {
        await db.execute(CREATE_REPORT_TABLE_SQL);
        console.log("Tabel report berhasil dipastikan ada.")
    } catch (error) {
        console.error("Gagal menginisialisasi database: ", error);
        throw error;
    }
}

export default initializedDatabase;