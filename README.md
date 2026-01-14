# 🛠️ Vision Design Architect (工业设计助手)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Powered by Gemini](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-blue)](https://aistudio.google.com/)

**Vision Design Architect** 是一款专为工业设计师和工程师打造的专业级 AI 工具。它利用 Google Gemini 先进的视觉能力，将产品照片转化为高保真的三视图（正交投影）技术图纸和工程蓝图。

![Vision Architect 预览](https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000)

## ✨ 核心功能

- **正交投影生成：** 仅需一张透视角度的产品照片，即可自动生成专业的顶视图、前视图和侧视图。
- **纹理与细节保留：** 特别针对复杂的纹理和符号进行了优化（例如月饼设计中的“红双喜”图案）。
- **专业工业设计布局：** 输出整洁的工程网格格式图纸，符合工业制图规范。
- **上下文感知绘图：** 支持自定义描述，引导 AI 理解材质属性（如：哑光、金属）、特定尺寸或独特设计特征。
- **导出就绪：** 生成的高分辨率图像可直接用于设计评审或初步的原型文档。

## 🚀 快速启动

### 1. 克隆仓库
```bash
git clone https://github.com/KJNotfound/vision-design-architect.git
cd vision-design-architect
```

### 2. 安装依赖
```bash
npm install
```

### 3. 配置 API 密钥
本应用需要使用 Google Gemini API 密钥。
1. 在 [Google AI Studio](https://aistudio.google.com/) 获取您的密钥。
2. 在项目根目录创建一个 `.env` 文件：
```env
VITE_API_KEY=您的_API_密钥
```

### 4. 启动开发服务器
```bash
npm run dev
```
应用将在 `http://localhost:5173` 运行。

## 🌐 部署指南 (Vercel / Netlify)

本项目已针对现代云托管平台进行优化：

1. **连接 GitHub：** 将您的仓库关联至 **Vercel** 或 **Netlify**。
2. **设置环境变量：** 在项目的设置面板中添加：
   - **Key:** `API_KEY`
   - **Value:** `您的_GEMINI_API_KEY_字符串`
3. **构建命令：** `npm run build`
4. **输出目录：** `dist`

## ⚙️ 技术栈

- **框架:** [React 19](https://react.dev/)
- **语言:** [TypeScript](https://www.typescriptlang.org/)
- **AI 引擎:** [@google/genai (Gemini 2.5 Flash)](https://ai.google.dev/)
- **样式:** [Tailwind CSS](https://tailwindcss.com/)
- **构建工具:** [Vite](https://vitejs.dev/)

## 📝 使用技巧

- **图像质量：** 为获得最佳效果，请使用背景中性、光线清晰的照片。
- **提示词引导：** 如果是设计特定的产品（如“带有红双喜图案的红色月饼”），请在“绘图上下文”框中注明材质需求（如“亮面塑料”、“磨砂陶瓷”）。
- **比例参考：** 请注意，AI 生成的蓝图主要用于视觉化和概念设计；在进行生产制造前，请务必在 CAD 软件中验证关键尺寸。

---
由 ❤️ 专为工业设计社区打造。