# CONTEXT

This project, `brainboard-backend`, is a Node.js API service built with Express.js and TypeScript. It serves as the backend for the "Brainboard" application, providing necessary API endpoints.

## Tech Stack & Architecture

*   **Language**: TypeScript
*   **Runtime**: Node.js
*   **Web Framework**: Express.js
*   **Environment Management**: `dotenv` for loading environment variables.
*   **Data Validation**: `zod` for schema validation, primarily used for environment variables and likely for API request payloads.
*   **Tooling**: `nodemon` and `tsx` facilitate a development workflow with hot-reloading and direct TypeScript execution, while `tsc` is used for compilation.

The architecture follows a standard Express API pattern, featuring a clear application entry point (`src/index.ts`), dedicated configuration management, and centralized error handling via middleware.

## Key Directories

*   `src/`: Contains all primary application source code.
    *   `src/config/`: Houses application-wide configuration.
        *   `env.ts`: Defines, loads, and validates environment variables using `dotenv` and `zod`.
        *   `index.ts`: Serves as the central access point for application configuration values.
    *   `src/middlewares/`: Stores Express middleware functions.
        *   `errorMiddleware.ts`: Implements a global error handling middleware for consistent error responses.
    *   `src/index.ts`: The main entry point of the application, responsible for initializing and starting the Express server.
*   `dist/`: The output directory for compiled JavaScript files after `npm run build`.

## Conventions & Patterns

*   **TypeScript-First**: All application code is written in TypeScript, ensuring type safety and code quality, enforced by `tsconfig.json` and build scripts.
*   **Environment Variables**: Environment variables are loaded from `.env` files via `dotenv` and undergo strict validation using `zod` (defined in `src/config/env.ts`) to ensure critical configurations are correct.
*   **Centralized Error Handling**: A dedicated error middleware (`src/middlewares/errorMiddleware.ts`) provides a consistent approach to handling and responding to errors across the API.
*   **Development Workflow**: `npm run dev` utilizes `nodemon` and `tsx` for an efficient development loop with hot-reloading and direct execution of TypeScript code.
*   **Production Build**: `npm run build` compiles the TypeScript source code into JavaScript in the `dist/` directory, and `npm run start` executes this compiled code for production deployments.