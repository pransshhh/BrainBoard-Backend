# brainboard-backend

This project is the backend service for the brainboard application.

## Getting Started

### Development Server

To start the development server with hot-reloading, run the following command:

```bash
npm install
npm run dev
```

The server will be accessible at the address configured in your environment variables (e.g., `http://localhost:3000`).

### Continuous Integration (CI)

The CI pipeline is configured to run on every pull request and performs the following automated checks:

*   **Build Check**: Ensures the TypeScript code compiles successfully without errors.
*   **Linting**: Verifies code quality and style according to ESLint rules.

Currently, there is no dedicated unit, integration, or end-to-end test suite configured for this project.
