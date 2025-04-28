# TurnPoint

> 🚀 A modern cross-platform desktop application built with **Tauri + React + Vite**, combining the power of a fast native shell with a full-featured frontend.

## 📦 Project Overview

TurnPoint is a cross-platform desktop application using Tauri as its backend shell and React as the frontend framework. It features modern UI components, drag-and-drop capabilities, advanced form handling, dynamic data tables, chart visualization, and more—making it perfect for data processing and interaction-rich interfaces.

---

## 🛠 Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Desktop Shell**: Tauri 2
- **UI Libraries**: Radix UI, Headless UI, Heroicons, Lucide
- **Table Management**: @tanstack/react-table
- **Charting**: Recharts
- **Form Handling**: React Hook Form + Zod
- **Utilities**: clsx, tailwind-merge, class-variance-authority
- **Styling & Animations**: Tailwind CSS, tailwindcss-animate
- **Excel Support**: xlsx
- **Toast Notifications**: react-hot-toast
- **Accessibility & Interactions**: Radix UI, @dnd-kit

---

## 📂 Installation & Development

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/turnpoint.git
cd turnpoint
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run in Development Mode

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

### 5. Launch Tauri Application

```bash
npm run tauri
```

### 6. Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure (Simplified)

```
turnpoint/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page-level components
│   ├── hooks/             # Custom hooks
│   ├── utils/             # Utility functions
│   ├── assets/            # Static assets
│   └── main.tsx           # Application entry point
├── public/                # Static public files
├── tauri.conf.json        # Tauri configuration
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🧩 Available Scripts

| Command             | Description                          |
|---------------------|--------------------------------------|
| `npm run dev`        | Start the Vite development server   |
| `npm run build`      | Compile TypeScript & build the app  |
| `npm run tauri`      | Run the Tauri desktop application   |
| `npm run preview`    | Preview the production build        |

---

## 📦 Installation Instructions

Thank you for choosing **TurnPoint**!  
Follow the steps below to install and run the application:

### 1. Download

- Visit the [TurnPoint v1.0.0 Release Page](https://github.com/chriswz1998/TurnPoint/releases/tag/v1.0.0).
- Under the **Assets** section, download the installer file appropriate for your system:
    - **Windows**: Download the `.exe` file (e.g., `TurnPoint Setup v1.0.0.exe`)
    - **MacOS**: Download the `.dmg` file (e.g., `TurnPoint-v1.0.0.dmg`)
    - **Linux**: Download the `.AppImage` or `.deb` file (depending on your distribution)

### 2. Install

#### Windows
- Double-click the downloaded `.exe` file.
- Follow the on-screen instructions to complete the installation.
- If Windows shows a "Windows protected your PC" warning, click **More Info** → **Run Anyway**.

#### MacOS (expect next version)
- Open the downloaded `.dmg` file.
- Drag the **TurnPoint** application into your **Applications** folder.
- If you encounter a security prompt (because the app is not notarized), go to:
    - **System Preferences** → **Security & Privacy** → **General** → Click **Open Anyway**.

### 3. Launch
- After installation, open the TurnPoint application from your system’s application menu or desktop shortcut.

### 4. Troubleshooting
- Ensure your operating system meets the basic system requirements.
- If you face installation or launch issues, please check the Issues page or submit a new ticket.
## 📄 License

MIT License © 2025 [Turning Point]
