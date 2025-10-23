# InvestiCase  
Investigation Case Manager

## Table of Contents
- [About](#about)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Architecture & Workflow](#architecture--workflow)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Running the Application](#running-the-application)  
- [Configuration](#configuration)  
- [Folder Structure](#folder-structure)  
- [Usage](#usage)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact / Author](#contact--author)  

## About  
InvestiCase is an “Investigation Case Manager” solution, designed to help manage and track investigation cases through a web-based front end and a back end service.

## Features  
- Case creation, tracking and status management  
- User interface for investigators and administrators  
- Secure backend API for data handling  
- Role-based access (if implemented)  
- Responsive web UI for easier use across devices  

## Tech Stack  
- Frontend: Angular :contentReference[oaicite:2]{index=2}  
- Backend: Spring Boot (as indicated in languages breakdown) :contentReference[oaicite:3]{index=3}  
  
## Architecture & Workflow  
1. A user logs into the web interface and creates or views a case.  
2. The UI communicates with the backend API to retrieve or update case data.  
3. Data is stored in a database (to be specified/configured).  
4. Administrators or investigators process case statuses, comments, attachments, etc.  
5. User have a calendar listing the cases in each day 
## Getting Started  

### Prerequisites  
- Node.js and npm (for frontend build)  
- Java (JDK) and Maven/Gradle (for backend)  
- A supported database (e.g., PostgreSQL, MySQL)  
- Git to clone the repository  

### Installation  
```bash
# Clone the repository
git clone https://github.com/MahdiHammami1/InvestiCase.git
cd InvestiCase

# Frontend setup
cd InvestiCase-Front
npm install

# Backend setup
cd ../InvestiCase-Back
# adjust according to your build tool, e.g.:
./mvnw install
