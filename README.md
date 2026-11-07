# Taste of India - feature bundle

- app-react-native/  Drop-in files for the Ownly RN app (customer-web-v1): feature code
  (src/features/TasteOfIndia), Nova ingress (src/features/nova/components/TasteOfIndiaIngress),
  Home injection (src/features/Home/data/injectTasteOfIndiaIngressRow*), and local assets
  (src/assets/images/tasteOfIndia). Assets are resolved via
  src/features/TasteOfIndia/assets (set TASTE_OF_INDIA_ASSET_CDN_BASE_URL to switch to CDN).
- integration-changes.patch  Edits to existing app files (navigation route, Home registry,
  serviceability presentation, Podfile/Xcode/WatermelonDB build fixes). Apply with:
  git apply integration-changes.patch   (build-fix hunks are optional)
- web-prototype-vercel/  Standalone Vite web prototype (live: https://taste-of-india-web.vercel.app).
  Run: npm install && npm run dev
Source branch: toi-glass-focus (tag prod-ready-1 = earlier backup point).
