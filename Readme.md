
<p align="center">
	<img src="https://dermaai.pages.dev/dermaai.png" alt="DermaAI Logo" width="180" />
</p>

# DermaAI Frontend

AI-Powered Skin Analysis Application — a modern web app for analyzing skin conditions using machine learning.


## 🚀 Features

- **AI Skin Analysis**: Upload skin images for instant AI-powered diagnosis
- **User Authentication**: Secure login/signup powered by Clerk
- **Dashboard**: View scan statistics and quick actions
- **Reports**: Automatically saved analysis reports with history
- **PDF Export**: Generate and print professional analysis reports


## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn


## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/ThesisLab2025/dermaai-frontend.git
cd dermaai-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file and update with your values:

```bash
cp .envexample .env.local
```

Edit `.env.local` with your configuration. See `.envexample` for reference.


### 4. Start the development server

```bash
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173)


## 🏗️ Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.


## 📁 Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── AnalysisReport.tsx
│   ├── Footer.tsx
│   ├── LeftNavbar.tsx
│   ├── Navbar.tsx
│   ├── ProtectedRoute.tsx
│   └── home/           # Home page sections
├── pages/              # Page components
│   ├── About.tsx
│   ├── Analysis.tsx
│   ├── Dashboard.tsx
│   ├── Explore.tsx
│   ├── Home.tsx
│   ├── Reports.tsx
│   └── Support.tsx
├── App.tsx             # Main app component with routes
└── main.tsx            # Application entry point
```


## 🔗 API Endpoints

The frontend expects the following backend endpoints:

| Method  | Endpoint                          | Description                      |
|---------|-----------------------------------|----------------------------------|
| POST    | `/predict`                        | AI skin analysis prediction      |
| POST    | `/api/analysis/save`              | Save analysis result             |
| GET     | `/api/analysis/stats/{user_id}`   | Get user statistics              |
| POST    | `/api/reports/save`               | Save analysis report             |
| GET     | `/api/reports/{user_id}`          | Get user's saved reports         |
| DELETE  | `/api/reports/{report_id}`        | Delete a report                  |
| POST    | `/users`                          | Sync user profile                |


## 🛡️ Authentication

This app uses [Clerk](https://clerk.com/) for authentication:

1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your Publishable Key
4. Add it to your `.env.local` file


## 📝 Scripts

| Command           | Description                |
|-------------------|---------------------------|
| `npm run dev`     | Start development server   |
| `npm run build`   | Build for production       |
| `npm run preview` | Preview production build   |
| `npm run lint`    | Run ESLint                 |


## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 📄 License


