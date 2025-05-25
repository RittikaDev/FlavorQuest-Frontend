# 🌮 Street Food Finder & Review Website - Frontend

A feature-rich, responsive web application where users can discover, review, and post street food spots. Built with **Next.js** and **Tailwind CSS**, the frontend interacts with a RESTful backend API to provide a seamless user experience.

## 🚀 Live Demo

Frontend: [https://flavor-quest-frontend.vercel.app/](https://flavor-quest-frontend.vercel.app/)  
Backend API: [https://flavor-quest-backend.vercel.app/api/v1](https://flavor-quest-backend.vercel.app/api/v1)

---

## 🧠 Project Features (Frontend)

### ✅ General
- Fully responsive design (mobile-first)
- Clean and intuitive UI using Tailwind CSS
- Navigation with authentication-aware layout

### 👤 User Functionality
- Register and login using email and password
- Post new food discoveries with:
  - Title
  - Description
  - Location
  - Price range
  - Image upload
  - Category selection
- View, search, and filter food spots
- Upvote/downvote and rate food spots
- Comment on food spots
- View profile and manage posted content

### 💎 Premium User Features
- Subscribe via payment gateway (SSLCommerz/ShurjoPay)
- Access exclusive “Premium” food posts

### 🔐 Admin Functionality
- Admin login and dashboard access
- Approve or reject user-submitted food posts
- Mark posts as premium content
- Moderate user comments

---

## ⚙️ Tech Stack

- Next.js

- Redux

- TypeScript

- Ant Design

- Lottie React


## 🛠️ Getting Started (Setup Locally)

### 1. Clone the Repository

```bash
git clone https://github.com/maybemahdi/FlavorQuest-Frontend.git
cd FlavorQuest-Frontend

npm install
# or
yarn install

## Create env file at root folder

- NEXT_PUBLIC_BASE_URL=https://flavor-quest-backend.vercel.app/api/v1
- NEXT_PUBLIC_GOOGLE_ID="your-google-client-id"
- NEXT_PUBLIC_GOOGLE_SECRET="your-google-client-secret"
- NEXT_PUBLIC_NEXT_AUTH_SECRET="your-random-auth-secret"

## Run the server

npm run dev
# or
yarn dev