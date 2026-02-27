# Dashboard View – Modern  Dashboard (Frontend)

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcn/ui&logoColor=white)](https://ui.shadcn.com)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

Modern, responsive  dashboard frontend built with React, TypeScript, Tailwind CSS and shadcn/ui.

Connects to any backend API to manage users, links, products, pricing plans, analytics, and more.

Live Demo → https://dashboard-view-website.vercel.app

GitHub Repository → https://github.com/developer-jabed/Dashboard-frontend

## ✨ Features

- 📊 Real-time analytics overview (views, clicks, conversions)
- 🔗 Manage short links (create, edit, delete, analytics)
- 🛒 Products management (add, edit, remove products)
- 💰 Pricing plans (create, update, delete pricing tiers)
- 🔍 Advanced filtering, sorting & search
- 📄 Pagination with smooth navigation
- 📱 Fully responsive & mobile-friendly
- 🌙 Dark mode support
- ⚡ Fast & lightweight (Vite + React)
- 🎨 Clean UI with glassmorphism & smooth animations

## Demo Credentials

Use these to log in to the live demo:

- **Email**: `user1@example.com`
- **Password**: `password123`

## Tech Stack

| Category          | Technology              | Purpose                              |
|-------------------|-------------------------|--------------------------------------|
| Framework         | React 18 / 19           | UI library                           |
| Build Tool        | Vite                    | Fast dev server & build              |
| Language          | TypeScript              | Type safety                          |
| Styling           | Tailwind CSS            | Utility-first CSS                    |
| Components        | shadcn/ui               | Beautiful, accessible UI             |
| Forms             | React Hook Form + Zod   | Type-safe form handling              |
| Data Fetching     | TanStack Query          | Server-state & caching               |
| Charts            | Recharts                | Responsive visualizations            |
| Icons             | Lucide React            | Modern icon set                      |
| Animations        | Framer Motion           | Smooth transitions                   |

## 🚀 Quick Start

### Prerequisites

- Node.js ≥ 18.17
- pnpm / npm / yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/developer-jabed/Dashboard-frontend.git
cd Dashboard-frontend

# Install dependencies
npm install

# Copy example env (adjust VITE_API_URL to your backend)
cp .env.example .env.local

# Start development server
npm dev

Open → http://localhost:5173
Build for production
Bashpnpm build
pnpm preview
🔧 Environment Variables (.env.local)


📖 How to Use the Dashboard

Login
Use demo credentials: user1@example.com / password123
Dashboard Overview
See key metrics (views, clicks, conversions, active users, revenue)
Manage Links
Create short links, edit/delete, view per-link analytics
Products
Add, edit, remove products with images & details
Pricing Plans
Create/update/delete subscription tiers & features
Filtering & Sorting
Use search, status/date filters, sort by any column
Pagination
Navigate through large lists smoothly



## Screenshots

<div align="center">
  <table>
    <tr>
      <td width="50%">
        <img src="https://i.postimg.cc/HLRjjxQ4/Screenshot-78.png" alt="Dashboard Overview" width="100%"/><br>
        <sub>1. Dashboard Overview</sub>
      </td>
      <td width="50%">
        <img src="https://i.postimg.cc/sXWxWrc6/Screenshot-79.png" alt="User Management" width="100%"/><br>
        <sub>2. User Management</sub>
      </td>
    </tr>
    <tr>
      <td>
        <img src="https://i.postimg.cc/4dcycg51/Screenshot-80.png" alt="Product Management" width="100%"/><br>
        <sub>3. Product Management</sub>
      </td>
      <td>
        <img src="https://i.postimg.cc/1tFXFQHM/Screenshot-81.png" alt="Analytics Dashboard" width="100%"/><br>
        <sub>4. Analytics Dashboard</sub>
      </td>
    </tr>
    <tr>
      <td>
        <img src="https://i.postimg.cc/85vcvSHy/Screenshot-82.png" alt="About Page" width="100%"/><br>
        <sub>5. About Page</sub>
      </td>
      <td>
        <img src="https://i.postimg.cc/SRps7v14/Screenshot-83.png" alt="Login Page" width="100%"/><br>
        <sub>6. Login Page</sub>
      </td>
    </tr>
  </table>
</div>