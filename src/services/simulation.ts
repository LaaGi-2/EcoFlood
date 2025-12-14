/**
 * Calculate flood probability based on environmental parameters
 * @param {number} forestCover - Forest coverage percentage (0-100)
 * @param {number} rainfall - Rainfall intensity in mm (0-300)
 * @param {string} soilAbsorption - Soil absorption level: 'low', 'medium', 'high'
 * @returns {object} Simulation results
 */
export function calculateFloodRisk(
     forestCover: number,
     rainfall: number,
     soilAbsorption: 'low' | 'medium' | 'high'
) {
     // Normalize inputs
     const forestFactor = 1 - (forestCover / 100) // Less forest = higher risk
     const rainfallFactor = rainfall / 300 // Normalized 0-1

     const soilFactors: Record<'low' | 'medium' | 'high', number> = {
          low: 0.9,
          medium: 0.5,
          high: 0.2
     }
     const soilFactor = soilFactors[soilAbsorption] || 0.5

     // Calculate flood probability (0-100)
     const baseProbability = (forestFactor * 40) + (rainfallFactor * 40) + (soilFactor * 20)
     const floodProbability = Math.min(100, Math.max(0, baseProbability))

     // Calculate water runoff (higher = more runoff)
     const runoff = ((forestFactor * 0.5) + (rainfallFactor * 0.3) + (soilFactor * 0.2)) * 100

     // Calculate environmental health (inverse of flood risk)
     const environmentalHealth = 100 - floodProbability

     // Risk level classification
     let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low'
     if (floodProbability > 70) riskLevel = 'critical'
     else if (floodProbability > 50) riskLevel = 'high'
     else if (floodProbability > 30) riskLevel = 'medium'

     return {
          floodProbability: Math.round(floodProbability),
          waterRunoff: Math.round(runoff),
          environmentalHealth: Math.round(environmentalHealth),
          riskLevel,
          factors: {
               forestImpact: Math.round(forestFactor * 100),
               rainfallImpact: Math.round(rainfallFactor * 100),
               soilImpact: Math.round(soilFactor * 100)
          }
     }
}

/**
 * Get risk level color
 */
export function getRiskColor(riskLevel: 'low' | 'medium' | 'high' | 'critical'): string {
     const colors: Record<'low' | 'medium' | 'high' | 'critical', string> = {
          low: '#10b981',
          medium: '#f59e0b',
          high: '#ef4444',
          critical: '#991b1b'
     }
     return colors[riskLevel] || colors.low
}

export interface Recommendation {
     icon: string
     text: string
     priority: 'critical' | 'high' | 'medium' | 'low'
}

/**
 * Generate recommendations based on simulation
 */
export function getRecommendations(results: {
     floodProbability: number
     factors: {
          forestImpact: number
          rainfallImpact: number
          soilImpact: number
     }
}): Recommendation[] {
     const recommendations: Recommendation[] = []

     // Critical risk recommendations (probability > 70%)
     if (results.floodProbability > 70) {
          recommendations.push({ icon: 'AlertOctagon', text: 'Tingkatkan kewaspadaan: Risiko banjir sangat tinggi! Segera koordinasi dengan instansi terkait untuk mitigasi bencana.', priority: 'critical' })
          recommendations.push({ icon: 'Construction', text: 'Prioritaskan pembangunan infrastruktur drainase dan tanggul penahan air di area rawan banjir.', priority: 'critical' })
     }

     // High forest impact (deforestation)
     if (results.factors.forestImpact > 70) {
          recommendations.push({ icon: 'TreePine', text: 'Dampak deforestasi sangat signifikan! Lakukan reboisasi intensif minimal 1000 pohon per hektar di daerah kritis.', priority: 'high' })
          recommendations.push({ icon: 'Shield', text: 'Terapkan kebijakan konservasi hutan ketat dan moratorium penebangan di kawasan resapan air.', priority: 'high' })
     } else if (results.factors.forestImpact > 50) {
          recommendations.push({ icon: 'Trees', text: 'Tingkatkan tutupan hutan dengan program penanaman pohon endemik yang akarnya kuat menyerap air.', priority: 'medium' })
     } else if (results.factors.forestImpact > 30) {
          recommendations.push({ icon: 'Sprout', text: 'Pertahankan tutupan hutan eksisting dan lakukan rehabilitasi di area yang terdegradasi.', priority: 'medium' })
     }

     // Rainfall impact
     if (results.factors.rainfallImpact > 70) {
          recommendations.push({ icon: 'CloudRain', text: 'Intensitas hujan ekstrem! Bangun sistem drainase modern dengan kapasitas 300+ mm/hari.', priority: 'high' })
          recommendations.push({ icon: 'Waves', text: 'Buat kolam retensi air (retention pond) untuk menampung limpasan air hujan berlebih.', priority: 'high' })
     } else if (results.factors.rainfallImpact > 50) {
          recommendations.push({ icon: 'Droplets', text: 'Perbaiki dan perluas jaringan drainase eksisting untuk mengatasi volume air yang meningkat.', priority: 'medium' })
     }

     // Soil absorption impact
     if (results.factors.soilImpact > 70) {
          recommendations.push({ icon: 'Mountain', text: 'Kondisi tanah kritis! Terapkan metode bioengineering untuk memperbaiki struktur dan porositas tanah.', priority: 'high' })
          recommendations.push({ icon: 'Layers', text: 'Lakukan konservasi tanah dengan terasering dan pembuatan sumur resapan di setiap lahan.', priority: 'high' })
     } else if (results.factors.soilImpact > 50) {
          recommendations.push({ icon: 'Leaf', text: 'Tingkatkan kemampuan resapan tanah dengan menambah bahan organik dan mengurangi pemadatan tanah.', priority: 'medium' })
     }

     // Medium risk recommendations (30-70%)
     if (results.floodProbability >= 50 && results.floodProbability <= 70) {
          recommendations.push({ icon: 'BarChart3', text: 'Lakukan kajian mendalam tentang pola aliran air dan identifikasi titik-titik rawan genangan.', priority: 'medium' })
          recommendations.push({ icon: 'Users', text: 'Sosialisasikan sistem peringatan dini banjir kepada masyarakat di area berisiko.', priority: 'medium' })
     }

     // Preventive recommendations for medium-low risk
     if (results.floodProbability >= 30 && results.floodProbability < 50) {
          recommendations.push({ icon: 'Eye', text: 'Pantau kondisi lingkungan secara berkala untuk mencegah peningkatan risiko banjir.', priority: 'low' })
          recommendations.push({ icon: 'BookOpen', text: 'Edukasi masyarakat tentang pentingnya menjaga kelestarian hutan dan lingkungan.', priority: 'low' })
     }

     // Low risk - maintain current conditions
     if (results.floodProbability < 30) {
          recommendations.push({ icon: 'CheckCircle', text: 'Kondisi lingkungan baik! Risiko banjir rendah dengan parameter saat ini.', priority: 'low' })
          recommendations.push({ icon: 'Sparkles', text: 'Pertahankan keseimbangan ekosistem dengan terus memelihara tutupan hutan dan kualitas tanah.', priority: 'low' })
          recommendations.push({ icon: 'ClipboardCheck', text: 'Tetap lakukan monitoring rutin untuk memastikan kondisi tetap optimal sepanjang tahun.', priority: 'low' })
     }

     // Additional context-specific recommendations
     if (results.factors.forestImpact > 60 && results.factors.soilImpact > 60) {
          recommendations.push({ icon: 'Zap', text: 'Kombinasi deforestasi dan tanah buruk menciptakan risiko berlipat! Prioritaskan rehabilitasi lahan kritis.', priority: 'critical' })
     }

     if (results.factors.rainfallImpact > 60 && results.factors.forestImpact > 60) {
          recommendations.push({ icon: 'Wind', text: 'Hujan ekstrem + deforestasi = risiko banjir bandang! Bangun sistem peringatan dini komunitas.', priority: 'critical' })
     }

     return recommendations
}
