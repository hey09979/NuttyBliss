# NuttyBliss Frontend

This is the frontend portion of the NuttyBliss eCommerce platform.

## 🎨 Design & UI
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4 (PostCSS mode)
- **Animations:** Framer Motion for premium micro-interactions
- **Icons:** Lucide React
- **State Management:** Redux Toolkit

## 🛠 Setup & Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

## 📄 Tailwind v4 Configuration
In v4, we use the CSS-first approach. The main styles are in `src/index.css`.
Custom theme extensions (colors, fonts) are defined in `tailwind.config.js` and imported into CSS using:
```css
@config "../tailwind.config.js";
```
