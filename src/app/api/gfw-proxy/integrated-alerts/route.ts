import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { logger } from '@/lib/logger'

const GFW_API_URL = 'https://data-api.globalforestwatch.org'

export async function GET(request: NextRequest) {
     const startTime = Date.now()
     try {
          const searchParams = request.nextUrl.searchParams
          const days = searchParams.get('days') || '30'

          const endDate = new Date()
          const startDate = new Date()
          startDate.setDate(startDate.getDate() - parseInt(days))

          const startDateStr = startDate.toISOString().split('T')[0]
          const endDateStr = endDate.toISOString().split('T')[0]
          const endpoint = `${GFW_API_URL}/dataset/gfw_integrated_alerts/latest/query`

          logger.apiRequest(endpoint, { days, startDate: startDateStr, endDate: endDateStr })

          // Call GFW API from server-side (no CORS issues)
          const response = await axios.get(endpoint, {
               params: {
                    sql: `SELECT latitude, longitude, confidence, alert__date as alert_date FROM gfw_integrated_alerts WHERE iso = 'IDN' AND alert__date >= '${startDateStr}' AND alert__date <= '${endDateStr}' ORDER BY alert__date DESC LIMIT 50`
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
          logger.apiError('GFW Integrated Alerts Proxy', err, duration)

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
