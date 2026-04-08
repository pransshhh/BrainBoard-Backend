```markdown
# CONTEXT

This document provides a high-level overview of the `brainboard-backend` project.

## Project Purpose

`brainboard-backend` is a backend API service designed to support a "brainboard" application. It provides the necessary API endpoints and business logic for the frontend to interact with.

## Tech Stack and Architecture

*   **Language**: TypeScript
*   **Runtime**: Node.js
*   **Web Framework**: Express.js
*   **Database**: PostgreSQL
*   **ORM**: TypeORM (for interacting with PostgreSQL)
*   **Authentication**: JWT (JSON Web Tokens) for user authentication. `bcrypt` for secure password hashing.
*   **Logging**: Winston (for structured logging).
*   **Environment Variables**: `dotenv` for configuration, `cross-env` for script-level env management.
*   **Schema Validation**: `zod` is available for data validation (e.g., API request payloads, configuration).
*   **Architecture**: It follows a typical RESTful API pattern, serving as a monolithic backend service, now organized into feature-based modules for better modularity.

## Key Directories and Their Purpose

*   `src/`: Contains all application source code.
    *   `src/config/`: Houses application configuration, including environment variables (`env.ts`).
    *   `src/database/`: Contains database-related files.
        *   `src/database/entities/`: Defines TypeORM entities mapping to database tables.
        *   `src/database/migrations/`: Database migration scripts for schema evolution.
    *   `src/features/`: Organizes code by specific feature modules (e.g., `src/features/users`, `src/features/boards`), each containing its own controllers, services, and routes.
    *   `src/middlewares/`: Stores Express middleware functions, notably `errorMiddleware.ts` for centralized error handling and authentication/authorization middlewares.
    *   `src/index.ts`: The application's entry point.
*   `dist/`: (Generated during `npm run build`) Contains the transpiled JavaScript output for production deployment.

## Important Conventions and Patterns

*   **TypeScript-first**: The entire codebase is written in TypeScript, ensuring type safety and improved maintainability.
*   **Environment Configuration**: Environment variables are managed using `dotenv` and loaded through `src/config/env.ts`, providing a centralized and type-safe way to access configuration.
*   **Data Persistence**: TypeORM is used with PostgreSQL for robust database interactions, with schema changes managed via migrations.
*   **Authentication & Authorization**: JWTs are used for stateless user authentication, and role-based access control (RBAC) is implemented for fine-grained authorization.
*   **Modular Architecture**: The `src/features` directory structure promotes a modular approach, encapsulating related logic within distinct feature boundaries.
*   **Centralized Error Handling**: A global error middleware (`src/middlewares/errorMiddleware.ts`) is used to catch and standardize error responses across the application.
*   **Logging**: Structured logging is implemented (e.g., using Winston) to provide clear, actionable insights into application behavior and errors.
*   **Schema Validation**: The presence of `zod` suggests a pattern for robust data validation, likely used for incoming API requests or internal data structures.
*   **Development vs. Production**: `nodemon` and `tsx` are used for a smooth development experience (hot-reloading, direct TS execution), while `tsc` compiles the project to JavaScript (`dist/`) for efficient production deployment.
```