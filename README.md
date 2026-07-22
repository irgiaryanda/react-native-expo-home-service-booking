# LuminaCare - Home Service Booking App

A production-grade React Native application for booking home services, built with Expo, TypeScript, and modern architectural patterns.

## Tech Stack

- **Framework**: Expo SDK 52 with React Native
- **Language**: TypeScript (strict mode)
- **Styling**: NativeWind v4 (Tailwind CSS for React Native)
- **Navigation**: React Navigation 7 (Native Stack)
- **State Management**: Redux Toolkit with React-Redux
- **Server State**: TanStack React Query v5
- **Testing**: Jest with React Testing Library

## Architecture

### Domain-Driven Design (DDD) Structure

```
src/
├── api/                    # API layer and service definitions
│   ├── services.ts        # Service type definitions and mock data
│   └── remoteConfig.ts    # Remote configuration management
├── store/                  # Redux store configuration
│   ├── slices/            # Feature-based Redux slices
│   │   ├── cartSlice.ts  # Cart functionality
│   │   └── cartSlice.test.ts
│   ├── hooks.ts           # Typed Redux hooks
│   └── index.ts           # Store configuration
├── features/               # Feature modules (DDD-style)
│   ├── home/              # Home feature module
│   │   ├── screens/
│   │   │   └── HomeScreen.tsx
│   │   └── index.ts
│   └── checkout/         # Checkout feature module
│       ├── screens/
│       │   └── CheckoutScreen.tsx
│       └── index.ts
├── components/             # Shared UI components
└── navigation/             # Navigation configuration
    └── AppNavigator.tsx
```

### Design Principles

1. **Feature-Based Organization**: Each feature (home, checkout) is self-contained with its own screens, components, and state
2. **Clean Separation**: Clear boundaries between API, store, and presentation layers
3. **Type Safety**: Strict TypeScript with comprehensive type definitions
4. **Testability**: All business logic is unit tested with Jest

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator / Android Emulator (for native development)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on iOS
npx expo run:ios

# Run on Android
npx expo run:android
```

### Environment Setup

The app uses a mock API layer (`src/api/`) for demonstration. Configure your backend URL in the appropriate API files.

## Available Scripts

```bash
# Development
npm start              # Start Expo development server
npm run android       # Run on Android
npm run ios           # Run on iOS

# Testing
npm test              # Run unit tests
npm test:watch        # Run tests in watch mode
npm test:coverage     # Generate coverage report

# Build
npm run build:android  # Build Android APK
npm run build:ios     # Build iOS app
```

## Testing

The project includes comprehensive unit tests for Redux slices using Jest:

```bash
npm test
```

### Test Structure

- Tests are co-located with the code they test (e.g., `cartSlice.test.ts` next to `cartSlice.ts`)
- Mock setup is configured in `jest.setup.js`
- TypeScript configuration for tests is in `tsconfig.jest.json`

## Project Configuration

### Key Configuration Files

| File | Purpose |
|------|---------|
| `app.json` | Expo app configuration |
| `babel.config.js` | Babel configuration with NativeWind plugin |
| `tailwind.config.js` | Tailwind CSS configuration |
| `nativewind.config.js` | NativeWind configuration |
| `metro.config.js` | Metro bundler configuration |
| `tsconfig.json` | TypeScript configuration |

### NativeWind Setup

The project is configured with NativeWind v4 for Tailwind CSS styling in React Native. The Babel plugin automatically transforms className props.

## Features

### Current Features

- [ ] Home screen with service listing
- [ ] Service detail view
- [ ] Cart management (add, remove, update quantity)
- [ ] Checkout flow
- [ ] Booking confirmation

### Planned Features

- [ ] User authentication
- [ ] Booking history
- [ ] Service provider profiles
- [ ] Payment integration
- [ ] Push notifications
- [ ] Real-time booking status

## Contributing

1. Create a feature branch from `main`
2. Follow the DDD folder structure
3. Write unit tests for new functionality
4. Ensure all tests pass before submitting PR
5. Update this README if adding new features

## License

Private - All rights reserved