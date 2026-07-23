# LuminaCare - Enterprise Home Service Booking App

LuminaCare is a production-ready mobile application for discovering, booking, and managing home services. It is designed as a portfolio-grade React Native project that demonstrates a maintainable mobile architecture, predictable state management, type-safe development, and polished cross-platform UI delivery.

The current experience supports service discovery, cart management, checkout navigation, promotional configuration, loading states, and error handling through a responsive NativeWind interface.

## Highlights

- Feature-oriented Domain-Driven Design structure
- Strict separation between client state and server state
- Type-safe React Native development with TypeScript
- Responsive utility-first styling with NativeWind and Tailwind CSS
- Expo SDK 54 compatibility for modern Expo Go workflows
- Native New Architecture and Bridgeless Mode compatibility
- Unit-tested cart domain behavior

## Application Screenshots

<table>
  <tr>
    <td width="33.33%"><img src="https://github.com/user-attachments/assets/322f4d66-ee94-4bcf-8e35-306faeb50b4d" alt="LuminaCare home screen" width="100%"></td>
    <td width="33.33%"><img src="https://github.com/user-attachments/assets/360726f2-3608-4fcb-a88a-138f73be3371" alt="LuminaCare service screen" width="100%"></td>
    <td width="33.33%"><img src="https://github.com/user-attachments/assets/a6785ee8-60bb-4fce-8d7a-827989540ddd" alt="LuminaCare checkout screen" width="100%"></td>
  </tr>
</table>


## Architecture

LuminaCare follows Domain-Driven Design principles through feature boundaries and clear ownership of application concerns. API access, state, navigation, and presentation remain isolated so the application can evolve without coupling unrelated domains.

```text
src/
├── api/
│   ├── remoteConfig.ts
│   └── services.ts
├── features/
│   ├── checkout/
│   │   └── screens/
│   └── home/
│       └── screens/
├── navigation/
│   └── AppNavigator.tsx
└── store/
    ├── slices/
    │   ├── cartSlice.test.ts
    │   └── cartSlice.ts
    ├── hooks.ts
    └── index.ts
```

### State Management Boundaries

| State Type | Responsibility | Technology |
| --- | --- | --- |
| Client State | Cart contents, quantities, totals, and local user actions | Redux Toolkit with typed hooks |
| Server State | Service catalog retrieval, asynchronous lifecycle, loading, and failure states | TanStack React Query |
| Configuration State | Feature flags and presentation settings | Remote configuration module |

This separation keeps the Redux store focused on durable client-side business state while React Query owns the lifecycle of remote data.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Mobile Framework | React Native 0.81.5, compatible with React Native 0.74+ practices |
| Platform | Expo SDK 54 with New Architecture and Bridgeless Mode compatibility |
| Language | TypeScript with strict compiler settings |
| Styling | NativeWind v4 and Tailwind CSS |
| Navigation | React Navigation Native Stack |
| Client State | Redux Toolkit and React Redux |
| Server State | TanStack React Query v5 |
| Animation Runtime | React Native Reanimated and Worklets |
| Testing | Jest, ts-jest, and React Testing Library-ready configuration |

## Testing and Performance

LuminaCare includes Jest coverage for cart domain rules, including quantity updates, removal flows, total calculation, and state reset behavior. The test setup is prepared for React Testing Library workflows as UI test coverage expands.

Performance and resilience are addressed through:

- Hermes engine optimization provided by the Expo runtime
- Native New Architecture and Bridgeless Mode alignment
- React Query caching and asynchronous state management
- Focused Redux updates for local cart operations
- Explicit loading and error states for service retrieval
- NativeWind utility compilation for consistent UI styling

Run the test suite:

```bash
npm test
```

## Local Setup

### Prerequisites

- Node.js 20.19 or newer
- npm 10 or newer
- Expo Go SDK 54 on a physical device, or a compatible Android emulator

### Installation

```bash
git clone https://github.com/irgiaryanda/react-native-expo-home-service-booking.git
cd react-native-expo-home-service-booking
npm install
```

### Start the Application

```bash
npm start
```

For a clean Metro cache after dependency or Babel changes:

```bash
npx expo start --clear
```

Open the displayed QR code with Expo Go on iOS or Android. For device testing on a local network, ensure the device and development machine use the same network.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm start` | Start the Expo development server |
| `npm run ios` | Open the project in an available iOS target |
| `npm run android` | Open the project in an available Android target |
| `npm run web` | Start the web target |
| `npm test` | Run the Jest test suite |
| `npm run test:watch` | Run Jest in watch mode |
| `npm run build:ios` | Create an iOS development build with EAS |
| `npm run build:android` | Create an Android development build with EAS |

## Quality Gates

Before submitting changes, run:

```bash
npx expo-doctor
npx tsc --noEmit
npm test -- --runInBand
```

## License

Private portfolio project. All rights reserved.
