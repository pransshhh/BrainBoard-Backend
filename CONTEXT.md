```markdown
# CONTEXT

This document provides a high-level overview of the `brainboard-backend` project.

## Project Purpose

`brainboard-backend` is a backend API service designed to support a "brainboard" application. It provides the necessary API endpoints and business logic for the frontend to interact with.

## Tech Stack and Architecture

*   **Language**: TypeScript
*   **Runtime**: Node.js
*   **Web Framework**: Express.js
*   **Environment Variables**: `dotenv` for configuration, `cross-env` for script-level env management.
*   **Schema Validation**: `zod` is available for data validation (e.g., API request payloads, configuration).
*   **Architecture**: It follows a typical RESTful API pattern built with Express, serving as a monolithic backend service.

## Key Directories and Their Purpose

*   `src/`: Contains all application source code.
    *   `src/config/`: Houses application configuration, including environment variables (`env.ts`).
    *   `src/middlewares/`: Stores Express middleware functions, notably `errorMiddleware.ts` for centralized error handling.
    *   `src/index.ts`: The application's entry point.
*   `dist/`: (Generated during `npm run build`) Contains the transpiled JavaScript output for production deployment.

## Important Conventions and Patterns

*   **TypeScript-first**: The entire codebase is written in TypeScript, ensuring type safety and improved maintainability.
*   **Environment Configuration**: Environment variables are managed using `dotenv` and loaded through `src/config/env.ts`, providing a centralized and type-safe way to access configuration.
*   **Centralized Error Handling**: A global error middleware (`src/middlewares/errorMiddleware.ts`) is used to catch and standardize error responses across the application.
*   **Development vs. Production**: `nodemon` and `tsx` are used for a smooth development experience (hot-reloading, direct TS execution), while `tsc` compiles the project to JavaScript (`dist/`) for efficient production deployment.
*   **Schema Validation**: The presence of `zod` suggests a pattern for robust data validation, likely used for incoming API requests or internal data structures.
```