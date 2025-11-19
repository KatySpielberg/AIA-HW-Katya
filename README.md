# AIA Homework – Ads Board (Full Stack: .NET Core + Angular)

This project is a full-stack web application developed as part of the Israel Airports Authority assignment.  
The solution includes a .NET Web API backend and an Angular client.  
The application allows browsing, creating, editing, and deleting ads of several categories.

---

## Project Goals
1. Implement a simple CRUD server using .NET Core.
2. Build a modern Angular client that interacts with the API.
3. Use clean and maintainable code structure.
4. Avoid external databases and store the data locally in JSON format.

---

## Backend (AIA-HW-Katya.Api)

The backend is implemented using .NET Core Web API and provides REST endpoints for managing ads.

Main features:
- JSON-based repository (ads.json)
- Full CRUD support:
  - GET /api/ads
  - GET /api/ads/{id}
  - POST /api/ads
  - PUT /api/ads/{id}
  - DELETE /api/ads/{id}
- Swagger support for testing the API
- Simple model validation
- CORS enabled for Angular client communication

To run the backend: dotnet run

Backend runs on:
https://localhost:5283

---

## Frontend (AIA-HW-Katya.Client)

The frontend is built with Angular (standalone components).

Main features:
- Reactive forms for creating and editing ads
- Separate reusable components:
  - ad-card – displays a single ad
  - ad-form – form for creating or updating an ad
- Category-based visual styling
- Loading, error and empty-state handling
- Environment configuration for API URLs

To run the frontend: ng serve

Frontend runs on:
http://localhost:4200

---

## Project Structure

AIA-HW-Katya.Api
│
├── Models
│     └── Ad.cs
│
├── Services
│     ├── FileAdsRepository.cs
│     ├── IAdsRepository.cs
│     └── ads.json
│
├── Properties
│     └── launchSettings.json
│
├── appsettings.json
│
└── Program.cs   ← endpoints
│
└── AIA-HW-Katya.Client
├── src/app
├── components
│ ├── ad-card
│ └── ad-form
├── models
├── services
├── app.ts
├── app.html
└── styles



---

## Notes

- The project does not require a database.
- All data is stored in a JSON file that serves as a simple repository.
- The architecture is kept clean and readable to support evaluation during the interview.
- Both backend and frontend can run independently.

---

## Author
Katya Spielberg

