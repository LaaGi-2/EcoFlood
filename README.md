# 🌊 EcoFlood - Flood & Deforestation Monitoring System

Platform monitoring banjir dan deforestasi berbasis Next.js yang terintegrasi dengan Global Forest Watch (GFW) API dan data cuaca real-time.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm atau yarn

### Installation

```bash
# Clone repository
git clone <repository-url>
cd EcoFlood

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## ✨ Features

- 🗺️ **Interactive Map** - Visualisasi data deforestasi dan banjir
- 🌳 **Deforestation Tracking** - Data kehilangan tutupan hutan dari GFW
- 💧 **Flood Monitoring** - Historical flood data dan risk assessment
- 🔥 **Fire Hotspots** - NASA FIRMS fire detection
- 🌿 **Biodiversity Data** - Protected areas dan endangered species
- 📊 **Analytics Dashboard** - Data visualization dengan charts
- 📱 **Responsive Design** - Mobile-friendly interface
- 🔄 **Real-time Updates** - Live data dari berbagai API sources

## 🏗️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **Maps:** Leaflet / MapLibre GL
- **Charts:** Recharts
- **API Integration:** Axios
- **Image Upload:** Cloudinary
- **Database:** MongoDB (via Mongoose)

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── api/            # API routes & proxies
│   │   └── gfw-proxy/  # GFW API proxy (CORS fix)
│   ├── peta/           # Map page
│   ├── laporan/        # Report page
│   └── simulasi/       # Simulation page
├── components/         # React components
│   ├── common/         # Shared components
│   ├── peta/           # Map-specific components
│   └── ui/             # UI primitives
├── services/           # API services
│   └── data.ts         # GFW & external API calls
├── hooks/              # Custom React hooks
│   └── map/            # Map-related hooks
├── lib/                # Utilities
│   ├── logger.ts       # Logging utility (NEW)
│   └── cloudinary.ts   # Image upload
└── store/              # Redux store
```

## 🔧 Recent Fixes (December 2024)

### ✅ CORS Error Resolution

- **Issue:** GFW API blocked by CORS policy
- **Solution:** Next.js API routes as server-side proxy
- **Files:** `src/app/api/gfw-proxy/*`
- **Details:** See [GFW_API_INTEGRATION.md](./GFW_API_INTEGRATION.md)

### ✅ Invalid Time Value Error

- **Issue:** `RangeError: Invalid time value` on date parsing
- **Solution:** Date validation with fallback
- **Files:** `src/hooks/map/useMapData.ts`
- **Details:** See [FIX_SUMMARY.md](./FIX_SUMMARY.md)

## 📚 Documentation

- **[GFW_API_INTEGRATION.md](./GFW_API_INTEGRATION.md)** - Complete GFW API integration guide
- **[FIX_SUMMARY.md](./FIX_SUMMARY.md)** - Summary of bug fixes & improvements
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Quick troubleshooting guide
- **[REDUX_REACT_QUERY_SETUP.md](./REDUX_REACT_QUERY_SETUP.md)** - State management setup

## 🧪 Testing

### Run Test Script

Open browser console at `http://localhost:3000/peta` and run:

```javascript
// Load test script
const script = document.createElement("script");
script.src = "/test-gfw-integration.js";
document.head.appendChild(script);

// After loaded, run tests
testGFWIntegration();
```

### Manual Testing

```bash
# Test API endpoints directly
curl http://localhost:3000/api/gfw-proxy/tree-cover-loss?year=2023
curl http://localhost:3000/api/gfw-proxy/integrated-alerts?days=30
```

## 🔑 Environment Variables

Create `.env.local` file:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Cloudinary (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Optional: GFW API Key (for higher rate limits)
GFW_API_KEY=your_gfw_api_key

# Admin credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
```

## 🚨 Common Issues & Solutions

### CORS Error

- ✅ **Fixed** via API proxy routes
- Requests now go through `/api/gfw-proxy/*`

### Invalid Date Error

- ✅ **Fixed** with date validation
- Fallback to current date if invalid

### Slow API Response

- ⏱️ Timeout set to 15 seconds
- Automatic fallback to mock data if API fails

### No Data Showing

- Check browser console for logs
- Look for: `⚠️ Using fallback data`
- Mock data will be used automatically

## 🛠️ Development

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting

### Logging

Centralized logging via `src/lib/logger.ts`:

```typescript
import { logger } from "@/lib/logger";

logger.info("Message", { context });
logger.warn("Warning", { context });
logger.error("Error", error, { context });
```

### API Routes Best Practices

- Always return 200 with `success: boolean`
- Include `useFallback` flag on errors
- Add request/response logging
- Set appropriate timeouts

## 📊 API Endpoints

### Internal API Routes

- `GET /api/report-disaster` - Get disaster reports
- `POST /api/report-disaster` - Submit new report
- `POST /api/approve-report-disaster/[id]` - Approve report (admin)
- `POST /api/login-admin` - Admin login
- `POST /api/predict-flood` - Flood prediction

### GFW Proxy Routes (NEW)

- `GET /api/gfw-proxy/tree-cover-loss?year=2023`
- `GET /api/gfw-proxy/integrated-alerts?days=30`

## 🌐 External APIs Used

- **Global Forest Watch** - Deforestation data
- **Open-Meteo** - Weather & rainfall data
- **Nominatim** - Geocoding & reverse geocoding
- **Cloudinary** - Image hosting

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Global Forest Watch for deforestation data
- NASA FIRMS for fire hotspot data
- Open-Meteo for weather data
- BNPB (Indonesia) for disaster data references

---

**Last Updated:** December 14, 2024  
**Status:** ✅ Production Ready
