```markdown
# Project Context: brainboard-backend

This document provides a high-level overview of the `brainboard-backend` project.

## What this project does

`brainboard-backend` is a Node.js backend service, likely serving as an API for a "brainboard" application. It handles server-side logic, processes requests, and exposes endpoints to a frontend or other consuming services.

## Tech Stack and Architecture

*   **Language**: TypeScript
*   **Runtime**: Node.js
*   **Web Framework**: Express.js for building HTTP APIs.
*   **Configuration**: `dotenv` for loading environment variables and `cross-env` for setting them across platforms.
*   **Validation**: `zod` for schema definition and data validation (e.g., environment variables, request payloads).
*   **Architecture**: A monolithic RESTful API service using middleware for request processing (e.g., error handling).

## Key Directories and Their Purpose

*   `src/`: Contains all application source code.
    *   `src/config/`: Houses configuration-related files, including environment variable definitions (`env.ts`) and general settings.
    *   `src/middlewares/`: Stores Express middleware functions, such as global error handling (`errorMiddleware.ts`).
*   `dist/`: (Implicit from `npm start` script) The output directory for compiled TypeScript code in production.

## Important Conventions and Patterns

*   **TypeScript-first**: The entire codebase is written in TypeScript, emphasizing type safety and improved developer experience.
*   **Express.js for API**: Utilizes Express.js as the core framework for routing, handling HTTP requests, and managing responses.
*   **Environment-based Configuration**: Leverages environment variables for all sensitive and environment-specific settings, loaded via `dotenv`.
*   **Zod for Validation**: `zod` is used for robust schema-based validation of configuration and potentially API input data.
*   **Centralized Error Handling**: A dedicated error middleware (`errorMiddleware.ts`) ensures consistent error responses across the API.
*   **Development Workflow**: `nodemon` paired with `tsx` provides a seamless development experience with live reloading of TypeScript files.
*   **Production Build**: TypeScript code is transpiled to JavaScript by `tsc` before deployment, with the production server running the compiled output from the `dist` directory.
```