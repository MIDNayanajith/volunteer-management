# Volunteer Task Management System

A full-stack web application designed to help organizations manage volunteer-based events and task assignments. Built using **React**, **Laravel**, and **MySQL**, it supports task delegation, role-based views, and real-time task tracking for both administrators and volunteers.

---

## 📝 Project Overview

This project was developed for the **Full Stack Developer assignment** at **digitalmarketing.lk**. It showcases practical full-stack skills, including:

- Frontend with React and Bootstrap
- Backend APIs with Laravel and JWT-based authentication
- MySQL database with pre-filled seed data
- RESTful APIs, input validation, and error handling

---

## 🔑 Login Credentials

Use these seeded credentials to log in:

### Admin Account

- **Email:** `admin@example.com`
- **Password:** `password123`

### Volunteer Account

- **Email:** `vol1@example.com`
- **Password:** `password123`

---

## 🎯 Core Features

### ✅ User Authentication

- Register and login functionality
- JWT-based token system
- Role-based redirection (Admin or Volunteer)

### 🛠 Admin/Manager Functionalities

- Create and manage **events** (title, date, location)
- Add **tasks** under each event (title, due date, priority)
- Assign tasks to volunteers
- View tasks with **status filters**
- View and manage **volunteer feedback**

### 🤝 Volunteer Functionalities

- View tasks assigned by admins
- Update task status: `New → In Progress → Done`
- Submit feedback after completing tasks

### 📊 Reporting

- Filter task lists by status (e.g., new, processing, complete)
- View all feedback related to tasks and events

---

## 🧰 Tech Stack

### Frontend

- React with Hooks
- React Router DOM
- Axios for HTTP requests
- Bootstrap for styling and layout

### Backend

- Laravel 10
- JWT authentication (`tymon/jwt-auth`)
- RESTful API routes
- Form validation & error handling

### Database

- MySQL
- Seeder files:
  - `UserSeeder.php`
  - `EventSeeder.php`
  - `TaskSeeder.php`
  - `FeedbackSeeder.php`

---

## 🛠 Setup Instructions

### 🔧 Prerequisites

- PHP >= 8.1
- Composer
- MySQL (or MariaDB)
- Node.js >= 18.x
- npm >= 9.x
- Laravel CLI (optional)

### 🔧 Backend (Laravel)

1. **Navigate to the backend folder:**

   ```bash
   cd backend
   ```

2. **Install PHP dependencies:**
   composer install

3. **Create .env file and configure database:**
   cp .env.example .env
   Update .env with your MySQL database credentials.

4. **Generate application key and JWT secret:**
   php artisan key:generate
   php artisan jwt:secret

5. **Run migrations and seeders:**
   php artisan migrate --seed

### 🔧 Frontend (React)

1. **Navigate to the frontend folder:**
   cd frontend

2. **Install Node.js dependencies:**
   npm install

3. **Start React development server:**
   npm start
