```markdown
## CONTEXT.md

This document provides a concise overview of the `brainboard-backend` project.

### What this project does

`brainboard-backend` is a Node.js backend service, likely serving an API. Its core purpose is to provide server-side functionality for an application, as indicated by its name and the use of the Express.js framework.

### Tech Stack and Architecture

*   **Language**: TypeScript
*   **Runtime**: Node.js
*   **Web Framework**: Express.js
*   **Environment Variables**: `dotenv`
*   **Schema Validation**: `zod`
*   **Development Tools**: `nodemon` (for live-reloading), `tsx` (for running TypeScript directly), `cross-env` (for cross-platform environment variable setting).
*   **Architecture**: It follows a common Express.js application structure with dedicated directories for configuration and middleware.

### Key Directories and Their Purpose

*   `src/`: Contains all the application's source code.
*   `src/config/`: Holds application configuration files, including environment variable definitions (`env.ts`) and main configuration exports.
*   `src/middlewares/`: Stores Express.js middleware functions, such as `errorMiddleware.ts` for centralized error handling.
*   `dist/`: (Generated after `npm run build`) Contains the compiled JavaScript output ready for production deployment.

### Important Conventions or Patterns

*   **TypeScript-first**: The entire codebase is written in TypeScript, ensuring type safety and improved maintainability.
*   **Environment Variables**: Configuration relies heavily on environment variables, managed via `dotenv` in development and `cross-env` for consistent access across environments.
*   **Express.js Structure**: Follows a standard Express application structure with clear separation of concerns for configuration and middleware.
*   **Schema Validation**: `zod` is used for defining and validating data schemas, likely for API request bodies, query parameters, or configuration.
*   **Development Workflow**: The `dev` script uses `nodemon` with `tsx` to provide a hot-reloading development experience, automatically recompiling and restarting the server on code changes.
*   **Build Process**: The `build` script compiles TypeScript to JavaScript, producing a `dist` directory for production deployments.
```