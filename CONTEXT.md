```markdown
## CONTEXT.md

This document provides a concise overview of the `brainboard-backend` project.

### What this project does

`brainboard-backend` is a Node.js backend service serving a RESTful API. Its core purpose is to provide server-side functionality for an application, including user authentication, data persistence via PostgreSQL, and structured API endpoints for resource management.

### Tech Stack and Architecture

*   **Language**: TypeScript
*   **Runtime**: Node.js
*   **Web Framework**: Express.js
*   **Database**: PostgreSQL
*   **ORM**: Prisma
*   **Authentication**: JSON Web Tokens (JWT), `bcrypt` for password hashing
*   **Logging**: Winston
*   **Environment Variables**: `dotenv`
*   **Schema Validation**: `zod`
*   **Development Tools**: `nodemon` (for live-reloading), `tsx` (for running TypeScript directly), `cross-env` (for cross-platform environment variable setting).
*   **Architecture**: Employs a layered architecture with clear separation of concerns, typical for Express.js applications, including dedicated layers for routing, controllers, services, and database interaction.

### Key Directories and Their Purpose

*   `src/`: Contains all the application's source code.
*   `src/config/`: Holds application configuration files, including environment variable definitions (`env.ts`) and main configuration exports.
*   `src/middlewares/`: Stores Express.js middleware functions, such as `errorMiddleware.ts` for centralized error handling, and authentication middleware.
*   `src/db/`: Contains database-related setup, including the Prisma client initialization.
*   `src/routes/`: Defines API endpoints and links them to corresponding controllers.
*   `src/controllers/`: Handles incoming requests, validates input, and delegates business logic to services.
*   `src/services/`: Encapsulates business logic and interacts with the database (via Prisma).
*   `src/utils/`: Generic utility functions (e.g., JWT helpers, logger setup).
*   `prisma/`: Contains the Prisma schema (`schema.prisma`) and migration files.
*   `dist/`: (Generated after `npm run build`) Contains the compiled JavaScript output ready for production deployment.

### Important Conventions or Patterns

*   **TypeScript-first**: The entire codebase is written in TypeScript, ensuring type safety and improved maintainability.
*   **Environment Variables**: Configuration relies heavily on environment variables, managed via `dotenv` in development and `cross-env` for consistent access across environments.
*   **Layered Architecture**: The application follows a clear separation of concerns into routes, controllers, and services, promoting modularity and testability.
*   **Schema Validation**: `zod` is used for defining and validating data schemas, particularly for API request bodies, query parameters, and configuration.
*   **Database Interaction**: Prisma ORM provides a type-safe and efficient way to interact with the PostgreSQL database, handling migrations and schema management.
*   **Authentication**: API endpoints are secured using JWT-based authentication, with passwords hashed using `bcrypt`.
*   **Structured Logging**: Winston is used for consistent, configurable, and structured logging across the application, aiding in debugging and monitoring.
*   **Development Workflow**: The `dev` script uses `nodemon` with `tsx` to provide a hot-reloading development experience, automatically recompiling and restarting the server on code changes.
*   **Build Process**: The `build` script compiles TypeScript to JavaScript, producing a `dist` directory for production deployments.
```