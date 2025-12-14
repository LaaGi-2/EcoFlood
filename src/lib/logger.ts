/**
 * Logging utilities for API calls and error tracking
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface LogEntry {
     timestamp: string
     level: LogLevel
     message: string
     context?: Record<string, unknown>
}

class Logger {
     private isDevelopment = process.env.NODE_ENV === 'development'

     private formatMessage(level: LogLevel, message: string, context?: Record<string, unknown>): LogEntry {
          return {
               timestamp: new Date().toISOString(),
               level,
               message,
               context
          }
     }

     info(message: string, context?: Record<string, unknown>) {
          if (this.isDevelopment) {
               const entry = this.formatMessage('info', message, context)
               console.info(`[${entry.timestamp}] ℹ️ ${message}`, context || '')
          }
     }

     warn(message: string, context?: Record<string, unknown>) {
          const entry = this.formatMessage('warn', message, context)
          console.warn(`[${entry.timestamp}] ⚠️ ${message}`, context || '')
     }

     error(message: string, error?: Error, context?: Record<string, unknown>) {
          const entry = this.formatMessage('error', message, {
               ...context,
               error: error?.message,
               stack: this.isDevelopment ? error?.stack : undefined
          })
          console.error(`[${entry.timestamp}] ❌ ${message}`, entry.context)
     }

     debug(message: string, context?: Record<string, unknown>) {
          if (this.isDevelopment) {
               const entry = this.formatMessage('debug', message, context)
               console.debug(`[${entry.timestamp}] 🐛 ${message}`, context || '')
          }
     }

     // Specific loggers for API calls
     apiRequest(url: string, params?: Record<string, unknown>) {
          this.debug('API Request', { url, params })
     }

     apiSuccess(url: string, duration?: number) {
          this.info('API Success', { url, duration: duration ? `${duration}ms` : undefined })
     }

     apiError(url: string, error: Error, duration?: number) {
          this.error('API Error', error, { url, duration: duration ? `${duration}ms` : undefined })
     }

     apiFallback(dataType: string, reason?: string) {
          this.warn(`Using fallback data: ${dataType}`, { reason })
     }
}

// Export singleton instance
export const logger = new Logger()

// Helper to measure API call duration
export function withTiming<T>(fn: () => Promise<T>, context?: string): Promise<T> {
     const start = Date.now()
     return fn()
          .then(result => {
               const duration = Date.now() - start
               if (context) {
                    logger.debug(`${context} completed in ${duration}ms`)
               }
               return result
          })
          .catch(error => {
               const duration = Date.now() - start
               if (context) {
                    logger.error(`${context} failed after ${duration}ms`, error)
               }
               throw error
          })
}
