# AI Project

This repository contains AI-related projects and experiments, including a full-stack money management application.

## Project Structure

```
AI/
├── README.md
├── package.json
├── .gitignore
└── money-app/
    ├── backend/
    │   ├── server.js
    │   ├── package.json
    │   └── package-lock.json
    └── frontend/
        ├── src/
        │   ├── app/
        │   │   ├── app.component.ts
        │   │   ├── app.component.css
        │   │   ├── app.module.ts
        │   │   ├── add-transaction.component.ts
        │   │   ├── add-transaction.component.css
        │   │   ├── transaction-list.component.ts
        │   │   └── transaction-list.component.css
        │   ├── index.html
        │   └── main.ts
        ├── angular.json
        ├── package.json
        ├── package-lock.json
        ├── tsconfig.json
        ├── tsconfig.app.json
        └── simple-app.html
```

## Projects

### Money App

A full-stack financial transaction management application built with Angular and Node.js/Express. This application allows users to track their financial transactions, categorize expenses, and monitor their balance.

#### Project Generation

This project was generated using AI assistance with the following prompt:

> "Create a full-stack money management application with Angular frontend and Node.js backend. The app should allow users to add, view, edit, and delete financial transactions with categories like Food, Bills, Entertainment, etc. Include features for balance tracking and use Angular Material for the UI. The backend should provide REST API endpoints for transaction management."

The AI generated a complete application structure including:
- Express.js backend with REST API endpoints
- Angular frontend with Material Design components
- Transaction management functionality
- Category-based organization
- Real-time balance calculation
- CORS-enabled communication between frontend and backend

#### Backend
- **Technology**: Node.js with Express.js
- **Port**: 3000 (configurable via PORT environment variable)
- **Data Storage**: In-memory (for development/demo purposes)
- **Dependencies**: 
  - Express 5.1.0 (Web framework)
  - CORS 2.8.5 (Cross-origin resource sharing)
  - Morgan 1.10.1 (HTTP request logger)
- **Location**: `money-app/backend/`

#### Frontend
- **Technology**: Angular 20.1.2
- **Port**: 4200
- **Dependencies**:
  - Angular Material 20.1.2 (UI components)
  - Angular CDK 20.1.2 (Component development kit)
  - RxJS 7.8.2 (Reactive programming)
  - TypeScript 5.8.3
  - Webpack 5.100.2 (Module bundler)
- **Location**: `money-app/frontend/`

#### API Endpoints

The backend provides the following REST API endpoints:

- **GET** `/api/transactions` - Retrieve all transactions
- **POST** `/api/transactions` - Create a new transaction
- **PUT** `/api/transactions/:id` - Update an existing transaction
- **DELETE** `/api/transactions/:id` - Delete a transaction
- **GET** `/api/categories` - Get available transaction categories
- **GET** `/api/balance` - Calculate and return current balance
- **GET** `/health` - Health check endpoint

#### Features

- **Transaction Management**: Add, view, edit, and delete financial transactions
- **Categorization**: Organize transactions by categories (Food, Bills, Entertainment, Transportation, Shopping, Income)
- **Balance Tracking**: Real-time balance calculation based on all transactions
- **Component-based Architecture**: Modular Angular components for scalability
- **Material Design**: Modern UI using Angular Material components
- **CORS Support**: Cross-origin requests enabled for frontend-backend communication
- **Request Logging**: HTTP request logging with Morgan middleware

#### Transaction Data Model

Each transaction includes:
- `id`: Unique identifier
- `amount`: Transaction amount (negative for expenses, positive for income)
- `category`: Transaction category
- `date`: Transaction date (ISO string format)
- `notes`: Optional transaction notes

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm package manager
- Angular CLI (for frontend development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cristianm009/AI.git
   cd AI
   ```

2. Install root dependencies:
   ```bash
   npm install
   ```

3. Set up the backend:
   ```bash
   cd money-app/backend
   npm install
   ```

4. Set up the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Applications

#### Backend Server
```bash
cd money-app/backend
node server.js
```
The backend API will be available at `http://localhost:3000`

#### Frontend Development Server
```bash
cd money-app/frontend
npm start
```
The frontend will be available at `http://localhost:4200`

#### Alternative Frontend Commands
```bash
# Serve on all network interfaces
npm run serve

# Build for production
npm run build

# Run Angular CLI commands
npm run ng
```

### Development Workflow

1. Start the backend server first:
   ```bash
   cd money-app/backend && node server.js
   ```

2. In a new terminal, start the frontend:
   ```bash
   cd money-app/frontend && npm start
   ```

3. Open your browser to `http://localhost:4200` to use the application

### API Testing

You can test the API endpoints using curl or any HTTP client:

```bash
# Get all transactions
curl http://localhost:3000/api/transactions

# Add a new transaction
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{"amount": -15.50, "category": "Food", "date": "2025-01-20T12:00:00Z", "notes": "Coffee"}'

# Get current balance
curl http://localhost:3000/api/balance

# Health check
curl http://localhost:3000/health
```

## Development Notes

- The backend uses in-memory storage, so data will be lost when the server restarts
- CORS is enabled to allow frontend-backend communication during development
- The application includes sample transaction data for testing
- All API responses are in JSON format
- Error handling is implemented for invalid requests

## Repository Information

- **Repository**: https://github.com/cristianm009/AI
- **Issues**: https://github.com/cristianm009/AI/issues
- **License**: ISC

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## Future Enhancements

- Database integration (PostgreSQL, MongoDB)
- User authentication and authorization
- Data persistence
- Transaction filtering and search
- Export functionality (CSV, PDF)
- Charts and analytics
- Mobile responsiveness improvements
- Unit and integration tests

## License

This project is licensed under the ISC License.
