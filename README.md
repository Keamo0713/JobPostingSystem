<img width="1570" height="783" alt="User entry" src="https://github.com/user-attachments/assets/b735d340-1ac3-402f-9498-d4c46ec76240" />
🚀 Job Posting System
A full-stack job posting application built with Angular frontend and .NET 8 backend, featuring job management, filtering, and real-time updates.

📋 Features
✅ Add new job postings

✅ View all jobs with filtering

✅ Filter by job type and location

✅ Delete job postings

✅ Responsive design

✅ In-memory database

✅ RESTful API

🛠️ Tech Stack
Backend
.NET 8 Web API

Entity Framework Core

In-Memory Database

Swagger/OpenAPI

CORS enabled

Frontend
Angular 16+

TypeScript

RxJS

CSS3 with modern styling

📥 Installation & Setup
Prerequisites
1. Install .NET 8 SDK

Download from: https://dotnet.microsoft.com/download/dotnet/8.0

Verify installation:

bash
dotnet --version
2. Install Node.js and npm

Download from: https://nodejs.org/

Recommended: Node.js 18+ LTS

Verify installation:

bash
node --version
npm --version
3. Install Angular CLI

bash
npm install -g @angular/cli@latest
4. Install Git

Download from: https://git-scm.com/

🚀 Quick Start
1. Clone the Repository
bash
git clone https://github.com/Keamo0713/JobPostingSystem.git
cd JobPostingSystem
2. Backend Setup (.NET API)
Navigate to backend:

bash
cd JobPostingAPI
Restore packages:

bash
dotnet restore
Run the API:

bash
dotnet run
Backend will start at: http://localhost:5269
API Documentation: http://localhost:5269/swagger

3. Frontend Setup (Angular)
Open a new terminal and navigate to frontend:

bash
cd job-posting-frontend
Install dependencies:

bash
npm install
Run the Angular application:

bash
ng serve
Frontend will start at: http://localhost:4200

🌐 API Endpoints
Method	Endpoint	Description
GET	/api/jobs	Get all jobs (with optional type/location filters)
GET	/api/jobs/{id}	Get job by ID
POST	/api/jobs	Create new job
DELETE	/api/jobs/{id}	Delete job by ID
GET	/api/jobs/debug-data	Debug endpoint for available data
📁 Project Structure
text
JobPostingSystem/
├── JobPostingAPI/                 # .NET Backend
│   ├── Controllers/               # API Controllers
│   ├── Models/                    # Data Models
│   ├── Data/                      # Database Context
│   ├── Program.cs                 # Application entry point
│   └── JobPostingAPI.csproj       # Project file
├── job-posting-frontend/          # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── job-list/          # Job list component
│   │   │   ├── job-form/          # Job form component
│   │   │   └── services/          # API services
│   │   ├── environments/          # Environment configurations
│   │   └── main.ts               # Angular bootstrap
│   ├── angular.json              # Angular configuration
│   └── package.json              # Node dependencies
└── README.md
🐳 Docker Support
The project includes Docker configuration for containerized deployment.

Build Docker image:

bash
docker build -t job-posting-api -f JobPostingAPI/Dockerfile .
Run container:

bash
docker run -p 8080:8080 job-posting-api
☁️ Deployment
Backend on Render
Push code to GitHub

Connect repository to Render.com

Use Docker deployment

Set environment variables:

ASPNETCORE_ENVIRONMENT=Production

ASPNETCORE_URLS=http://*:$PORT

Frontend on Netlify
Build Angular app: ng build --configuration=production

Deploy dist folder to Netlify

Update environment.prod.ts with backend URL

🔧 Environment Configuration
Backend Environment
Development: http://localhost:5269

Production: Set via ASPNETCORE_URLS environment variable

Frontend Environments
environment.ts (Development):

typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5269/api'
};
environment.prod.ts (Production):

typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-render-backend.onrender.com/api'
};
🐛 Troubleshooting
Common Issues
1. Port already in use

bash
# Change port for Angular
ng serve --port 4201

# Change port for .NET
# Update launchSettings.json or use environment variable
2. CORS issues

Ensure backend CORS is configured for frontend URL

Check Program.cs CORS configuration

3. Node modules issues

bash
# Clear and reinstall
rm -rf node_modules
rm package-lock.json
npm install
4. .NET build issues

bash
# Clean and rebuild
dotnet clean
dotnet build
📝 Available Scripts
Backend
bash
dotnet run          # Run application
dotnet build        # Build project
dotnet test         # Run tests
dotnet watch run    # Run with hot reload
Frontend
bash
ng serve           # Development server
ng build           # Production build
ng test            # Run tests
ng lint            # Code linting
🤝 Contributing
Fork the repository

Create a feature branch

Commit your changes

Push to the branch

Create a Pull Request

📄 License
This project is licensed under the MIT License.

👥 Authors
Your Name - Initial work

🙏 Acknowledgments
.NET Team for the excellent framework

Angular Team for the powerful frontend framework

Render for free hosting

Netlify for frontend deployment

Happy Coding! 🎉

