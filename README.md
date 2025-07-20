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

A full-stack financial transaction management application built with Angular and Node.js/Express.

#### Backend
- **Technology**: Node.js with Express.js
- **Dependencies**: 
  - Express 5.1.0 (Web framework)
  - CORS 2.8.5 (Cross-origin resource sharing)
  - Morgan 1.10.1 (HTTP request logger)
- **Location**: `money-app/backend/`

#### Frontend
- **Technology**: Angular 20.1.2
- **Dependencies**:
  - Angular Material 20.1.2 (UI components)
  - Angular CDK 20.1.2 (Component development kit)
  - RxJS 7.8.2 (Reactive programming)
  - TypeScript 5.8.3
- **Location**: `money-app/frontend/`

#### Features
Based on the component structure, the money app includes:
- Transaction management (add/view transactions)
- Component-based architecture
- Material Design UI components

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager
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

#### Frontend Development Server
```bash
cd money-app/frontend
npm run serve
```
The frontend will be available at `http://localhost:4200`

#### Alternative Frontend Start
```bash
npm start
```

### Development Scripts

#### Frontend
- `npm run ng` - Run Angular CLI commands
- `npm run start` - Start development server on port 4200
- `npm run build` - Build the application for production
- `npm run serve` - Serve the application on all network interfaces

## Repository Information

- **Repository**: https://github.com/cristianm009/AI
- **Issues**: https://github.com/cristianm009/AI/issues
- **License**: ISC

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the ISC License.
