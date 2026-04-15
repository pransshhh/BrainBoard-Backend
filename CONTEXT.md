```markdown
# Project Context: brainboard-backend

This document provides a high-level overview of the `brainboard-backend` project.

## What this project does

`brainboard-backend` is a Node.js backend service, serving as a RESTful API for a "brainboard" application. It handles server-side logic, processes requests, manages data persistence, and exposes endpoints to a frontend or other consuming services.

## Tech Stack and Architecture

*   **Language**: TypeScript
*   **Runtime**: Node.js
*   **Web Framework**: Express.js for building HTTP APIs.
*   **Database**: MongoDB (via `mongoose` ODM) for data persistence.
*   **Configuration**: `dotenv` for loading environment variables and `cross-env` for setting them across platforms.
*   **Validation**: `zod` for schema definition and data validation (e.g., environment variables, request payloads).
*   **Logging**: `winston` for structured and configurable application logging.
*   **Testing**: `jest` for unit and integration testing.
*   **Architecture**: A monolithic RESTful API service using a **Controller-Service pattern** for separation of concerns, with middleware for request processing (e.g., error handling, authentication).

## Key Directories and Their Purpose

*   `src/`: Contains all application source code.
    *   `src/config/`: Houses configuration-related files, including environment variable definitions (`env.ts`), database settings, and general application settings.
    *   `src/controllers/`: Contains request handler functions, responsible for processing incoming requests and orchestrating responses.
    *   `src/database/`: Manages database connection setup, initialization, and any ORM/ODM-specific configurations.
    *   `src/middlewares/`: Stores Express middleware functions, such as global error handling (`errorMiddleware.ts`), authentication, and validation.
    *   `src/models/`: Defines Mongoose schemas and models for interacting with MongoDB.
    *   `src/routes/`: Defines API endpoints and their associated handler functions (controllers).
    *   `src/services/`: Encapsulates business logic, interacting with models, performing complex operations, and potentially integrating with external services.
    *   `src/utils/`: Contains general utility functions and helpers used across the application.
*   `src/tests/`: Contains unit and integration test files for various application components.
*   `dist/`: (Implicit from `npm start` script) The output directory for compiled TypeScript code in production.

## Important Conventions and Patterns

*   **TypeScript-first**: The entire codebase is written in TypeScript, emphasizing type safety and improved developer experience.
*   **Express.js for API**: Utilizes Express.js as the core framework for routing, handling HTTP requests, and managing responses.
*   **Environment-based Configuration**: Leverages environment variables for all sensitive and environment-specific settings, loaded via `dotenv`.
*   **Zod for Validation**: `zod` is used for robust schema-based validation of configuration and API input data.
*   **Centralized Error Handling**: A dedicated error middleware (`errorMiddleware.ts`) ensures consistent error responses across the API.
*   **Development Workflow**: `nodemon` paired with `tsx` provides a seamless development experience with live reloading of TypeScript files.
*   **Production Build**: TypeScript code is transpiled to JavaScript by `tsc` before deployment, with the production server running the compiled output from the `dist` directory.
*   **Controller-Service Pattern**: API logic is separated into `controllers` (handling HTTP requests/responses) and `services` (containing core business logic and data manipulation).
*   **Data Persistence with Mongoose**: `mongoose` is used to define data schemas, interact with MongoDB, and enforce data integrity and relationships.
*   **Structured Logging**: `winston` is configured to provide consistent, structured logging across the application, aiding in debugging, monitoring, and auditing.
*   **Comprehensive Testing**: `jest` is the chosen framework for writing and running unit and integration tests to ensure code quality, reliability, and functionality.
```