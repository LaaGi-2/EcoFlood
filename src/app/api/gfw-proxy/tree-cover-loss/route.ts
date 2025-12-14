import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { logger } from '@/lib/logger'

const GFW_API_URL = 'https://data-api.globalforestwatch.org'

export async function GET(request: NextRequest) {
     const startTime = Date.now()
     try {
          const searchParams = request.nextUrl.searchParams
          const year = searchParams.get('year') || '2023'
          const endpoint = `${GFW_API_URL}/dataset/umd_tree_cover_loss/latest/query`

          logger.apiRequest(endpoint, { year })

          // Call GFW API from server-side (no CORS issues)
          const response = await axios.get(endpoint, {
               params: {
                    sql: `SELECT umd_tree_cover_loss__year as year, SUM(umd_tree_cover_loss__ha) as area_ha, latitude, longitude FROM umd_tree_cover_loss WHERE iso = 'IDN' AND umd_tree_cover_loss__year = ${year} GROUP BY year, latitude, longitude ORDER BY area_ha DESC LIMIT 100`
               },
               timeout: 15000,
               headers: {
                    'Accept': 'application/json'
               }
          })

          const duration = Date.now() - startTime
          logger.apiSuccess(endpoint, duration)

          return NextResponse.json({
               success: true,
               data: response.data
          })
     } catch (error) {
          const duration = Date.now() - startTime
          const err = error instanceof Error ? error : new Error('Unknown error')
          logger.apiError('GFW Tree Cover Loss Proxy', err, duration)

          // Return error but with 200 status so client can use fallback
          return NextResponse.json(
               {
                    success: false,
                    error: err.message,
                    useFallback: true
               },
               { status: 200 }
          )
     }
}
