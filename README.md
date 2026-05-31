# Smart Scholarship Recommendation Portal

A full-stack web application that helps students discover scholarships based on their eligibility criteria. The platform automates scholarship collection, stores data centrally, and provides personalized scholarship recommendations through an intuitive user interface.

## Live Demo

🔗 https://scholarship-recommendation-portal.vercel.app/

---

## Project Overview

Finding suitable scholarships can be time-consuming because information is scattered across multiple websites. This project addresses that problem by providing a centralized platform where students can:

* Register and log in securely
* Enter eligibility details
* Receive personalized scholarship recommendations
* Access official scholarship application links
* Explore available scholarship opportunities from a single platform

The system also includes an admin panel for managing scholarship records.

---

## Features

### Student Module

* User Registration and Login
* Personalized Scholarship Recommendations
* Scholarship Search and Filtering
* Eligibility-Based Matching
* Direct Access to Official Application Links

### Admin Module

* Secure Admin Access
* Add Scholarships Manually
* Manage Scholarship Records
* Update Scholarship Information

### Automation Module

* Selenium-based Web Scraping
* Automated Scholarship Data Collection
* Reduced Manual Data Entry Effort

---

## System Architecture

User → React Frontend → Node.js/Express Backend → MongoDB Atlas Database

Selenium Scraper → MongoDB Atlas → Recommendation System → User Interface

---

## Technology Stack

### Frontend

* React.js
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas

### Automation

* Selenium

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## Project Workflow

1. User registers or logs in.
2. Student enters eligibility details.
3. Backend filters scholarships based on eligibility criteria.
4. Matching scholarships are recommended.
5. User applies through official scholarship links.

---

## Screenshots

### Home Page
 <img width="1918" height="906" alt="Screenshot 2026-05-25 144330" src="https://github.com/user-attachments/assets/b0acc1fc-0fb6-41c5-9163-9d1b8b29420d" />


### Student Recommendation Module
<img width="773" height="839" alt="Screenshot 2026-05-25 234525" src="https://github.com/user-attachments/assets/062afda8-5ee1-4abd-bf18-17b02a406069" />

<img width="1914" height="911" alt="Screenshot 2026-05-25 145016" src="https://github.com/user-attachments/assets/600c405f-e827-4b68-82c9-705f9efc4895" />


### Admin Dashboard
<img width="527" height="688" alt="Screenshot 2026-05-25 224159" src="https://github.com/user-attachments/assets/1c9c1d72-1895-434e-899f-c220107fda96" />


---

## Installation and Setup

### Clone Repository

```bash
git clone https://github.com/Kumari-Mansi/Scholarship-Recommendation-Portal.git
cd Scholarship-Recommendation-Portal
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

Create a `.env` file in the backend directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

## Key Outcomes

* Centralized scholarship information system
* Personalized recommendation mechanism
* Automated scholarship data collection
* Cloud database integration using MongoDB Atlas
* Successful deployment on Vercel and Render
* Responsive and user-friendly interface

---

## Future Enhancements

* Machine Learning-based Recommendation Engine
* Email and Push Notifications
* Mobile Application Support
* Advanced Search and Analytics
* Scholarship Deadline Reminder System

---

## Author

**Mansi Kumari**
B.Tech, Electronics & Computer Engineering, 
NIAMT, Ranchi

---

## Project Status

Completed and Successfully Deployed

Live Application: https://scholarship-recommendation-portal.vercel.app/
