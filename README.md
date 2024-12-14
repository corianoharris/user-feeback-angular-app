# Angular User Feedback Form with Signal-Based State Management

## 🚀 Project Overview

This is a modern Angular application demonstrating best practices in state management, form handling, and component architecture using Angular's latest features, including signals and standalone components.

### Key Features
- 📝 Reactive Form with Validation
- 💾 Local Storage Persistence
- 🔄 Signal-Based State Management
- 🎨 Tailwind CSS Styling
- 🧪 Comprehensive Testing (Unit & E2E)

## 🛠 Technologies Used
- Angular 17+
- TypeScript
- Tailwind CSS
- RxJS
- Signals
- Playwright
- Cypress
- Jest

## 📋 Prerequisites
- Node.js (v18+)
- npm (v9+)
- Angular CLI

## 🔧 Setup and Installation

### 1. Clone the Repository

### 2. Install Dependencies
```bash
npm install
```

### 3. Development Server
```bash
# Start development server
npm start

# Navigate to
http://localhost:4200/
```

## 🧪 Running Tests

### Unit Tests
```bash
# Run unit tests
npm test

# Run with coverage
npm run test:coverage
```

### E2E Tests
```bash
# Playwright tests
npm run playwright

# Cypress tests
npm run cypress
```

## 📂 Same Project Structure
```
src/
├── app/
│   ├── core/              # Core services and interfaces
│   ├── features/          # Feature-specific components
│   ├── shared/            # Shared components and utilities
│   └── app.config.ts      # App configuration
├── assets/                # Static assets
└── styles/                # Global styles
```

## 🌟 Key Components
- `UserFormComponent`: Main form for collecting user feedback
- `UserDataService`: State management service using signals
- `FormErrorComponent`: Reusable form validation error display

## 🔍 State Management
The application uses Angular's new signal-based state management:
- Centralized state in `UserDataService`
- Reactive signals for data updates
- Local storage integration

## 🎨 Styling
- Tailwind CSS for responsive and utility-first design
- Custom theme configuration
- Responsive layout

## 🚀 Deployment


## 🤝 Contributing


## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact
Coriano Harris - corianoharrispro@gmail.com



---

## 🔮 Future Improvements
- [ ] Add user authentication
- [ ] Implement advanced filtering
- [ ] Create admin dashboard
- [ ] Add internationalization support
