# 🛠️ Vision Design Architect (Industrial Design Tool)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Powered by Gemini](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-blue)](https://aistudio.google.com/)

**Vision Design Architect** is a professional-grade AI tool designed for industrial designers and engineers. It leverages the advanced vision capabilities of Google Gemini to transform product photographs into high-fidelity, 3-view technical drawings (orthographic projections) and engineering blueprints.

![Vision Architect Preview](https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000)

## ✨ Core Features

- **Orthographic Projection:** Automatically generates professional Top, Front, and Side views from a single perspective image.
- **Pattern Preservation:** Specifically optimized to retain intricate textures and symbols (like the "Double Happiness" pattern for mooncake designs).
- **Industrial Design Layout:** Outputs drawings in a clean, professional engineering grid format.
- **Context-Aware Drafting:** Provide custom descriptions to guide the AI on material properties, specific dimensions, or unique features.
- **Export Ready:** High-resolution output suitable for design reviews or initial prototyping documentation.

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/vision-design-architect.git
cd vision-design-architect
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure API Key
The application requires a Google Gemini API Key.
1. Get your key from [Google AI Studio](https://aistudio.google.com/).
2. Create a `.env` file in the root directory:
```env
VITE_API_KEY=your_actual_api_key_here
```

### 4. Run Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

## 🌐 Deployment (Vercel / Netlify)

This project is optimized for modern cloud hosting platforms:

1. **Connect GitHub:** Link your repository to **Vercel** or **Netlify**.
2. **Environment Variable:** In your project settings dashboard, add:
    - **Key:** `API_KEY`
    - **Value:** `YOUR_GEMINI_API_KEY_STRING`
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`

## ⚙️ Technical Stack

- **Framework:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **AI Engine:** [@google/genai (Gemini 2.5 Flash)](https://ai.google.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Bundler:** [Vite](https://vitejs.dev/)

## 📝 Usage Tips

- **Image Quality:** For best results, use a clear photo with a neutral background.
- **Prompting:** If designing a specific product (e.g., a "Red Mooncake with Double Happiness pattern"), specify the desired material (e.g., "Glossy plastic," "Matte ceramic") in the Context field.
- **Scaling:** Note that AI-generated blueprints are for visualization and conceptual design; always verify critical dimensions in CAD software for manufacturing.

---
Built with ❤️ for the Industrial Design Community.