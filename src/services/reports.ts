// Service untuk integrasi API laporan warga
// Siap diintegrasikan dengan private API backend

interface UserReport {
     id: string
     lat: number
     lng: number
     location: string
     type: 'flood' | 'deforestation' | 'fire' | 'other'
     description: string
     date: string
     status: 'pending' | 'verified' | 'rejected'
     imageUrl?: string
}

interface SubmitReportData {
     type: 'flood' | 'deforestation' | 'fire' | 'other'
     location: string
     description: string
     lat: number
     lng: number
     image?: File
}

// Base URL untuk API (ganti dengan URL private API Anda)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

/**
 * Submit laporan baru dari user
 * @param reportData Data laporan yang akan dikirim
 * @returns Promise<UserReport> Laporan yang berhasil dibuat
 */
export async function submitUserReport(reportData: SubmitReportData): Promise<UserReport> {
     try {
          const formData = new FormData()
          formData.append('type', reportData.type)
          formData.append('location', reportData.location)
          formData.append('description', reportData.description)
          formData.append('lat', reportData.lat.toString())
          formData.append('lng', reportData.lng.toString())

          if (reportData.image) {
               formData.append('image', reportData.image)
          }

          const response = await fetch(`${API_BASE_URL}/report-disaster`, {
               method: 'POST',
               body: formData
          })

          if (!response.ok) {
               throw new Error('Failed to submit report')
          }

          const data = await response.json()
          return data
     } catch (error) {
          console.error('Error submitting report:', error)
          throw error
     }
}

/**
 * Fetch semua laporan user
 * @param filters Optional filter berdasarkan status, type, atau island
 * @returns Promise<UserReport[]> Array of user reports
 */
export async function fetchUserReports(filters?: {
     status?: 'pending' | 'verified' | 'rejected'
     type?: 'flood' | 'deforestation' | 'fire' | 'other'
     island?: string
     startDate?: string
     endDate?: string
}): Promise<UserReport[]> {
     try {
          const queryParams = new URLSearchParams()

          if (filters?.status) queryParams.append('status', filters.status)
          if (filters?.type) queryParams.append('type', filters.type)
          if (filters?.island) queryParams.append('island', filters.island)
          if (filters?.startDate) queryParams.append('startDate', filters.startDate)
          if (filters?.endDate) queryParams.append('endDate', filters.endDate)

          const response = await fetch(`${API_BASE_URL}/user-reports?${queryParams}`)

          if (!response.ok) {
               throw new Error('Failed to fetch user reports')
          }

          const data = await response.json()
          return data
     } catch (error) {
          console.error('Error fetching user reports:', error)
          // Return empty array if API fails
          return []
     }
}

/**
 * Update status laporan (hanya untuk admin)
 * @param reportId ID laporan yang akan diupdate
 * @param status Status baru
 * @returns Promise<UserReport> Laporan yang sudah diupdate
 */
export async function updateReportStatus(
     reportId: string,
     status: 'pending' | 'verified' | 'rejected'
): Promise<UserReport> {
     try {
          const response = await fetch(`${API_BASE_URL}/approve-report-disaster/${reportId}`, {
               method: 'PUT',
               headers: {
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify({ status })
          })

          if (!response.ok) {
               throw new Error('Failed to update report status')
          }

          const data = await response.json()
          return data
     } catch (error) {
          console.error('Error updating report status:', error)
          throw error
     }
}

/**
 * Delete laporan (hanya untuk admin atau owner)
 * @param reportId ID laporan yang akan dihapus
 * @returns Promise<boolean> True if successful
 */
export async function deleteUserReport(reportId: string): Promise<boolean> {
     try {
          const response = await fetch(`${API_BASE_URL}/user-reports/${reportId}`, {
               method: 'DELETE'
          })

          if (!response.ok) {
               throw new Error('Failed to delete report')
          }

          return true
     } catch (error) {
          console.error('Error deleting report:', error)
          throw error
     }
}

/**
 * Get report statistics
 * @returns Promise<ReportStats> Statistik laporan
 */
export async function getReportStatistics(): Promise<{
     total: number
     pending: number
     verified: number
     rejected: number
     byType: Record<string, number>
     byIsland: Record<string, number>
}> {
     try {
          const response = await fetch(`${API_BASE_URL}/user-reports/statistics`)

          if (!response.ok) {
               throw new Error('Failed to fetch report statistics')
          }

          const data = await response.json()
          return data
     } catch (error) {
          console.error('Error fetching report statistics:', error)
          // Return default stats if API fails
          return {
               total: 0,
               pending: 0,
               verified: 0,
               rejected: 0,
               byType: {},
               byIsland: {}
          }
     }
}

export type { UserReport, SubmitReportData }
