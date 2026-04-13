```markdown
## CONTEXT.md

This document provides a concise overview of the `brainboard-backend` project.

### What this project does

This project is the backend service for "Brainboard," likely a web application. It provides a RESTful API to support the frontend application's functionality.

### Tech Stack and Architecture

*   **Language**: TypeScript
*   **Runtime**: Node.js
*   **Web Framework**: Express.js
*   **Environment Variables**: `dotenv` for loading `.env` files.
*   **Schema Validation**: `zod` for robust data validation.
*   **Development Tools**: `nodemon` for hot-reloading, `tsx` for running TypeScript directly in development.
*   **Architecture**: A single-service backend exposing a RESTful API. It follows a layered approach with dedicated directories for configuration and middleware.

### Key Directories and Their Purpose

*   `src/`: Contains all application source code.
    *   `src/config/`: Manages application configuration, including environment-specific settings (`env.ts`) and main configuration entry (`index.ts`).
    *   `src/middlewares/`: Houses Express middleware functions, such as `errorMiddleware.ts` for centralized error handling.
    *   `src/index.ts`: The primary entry point for the Express application.
*   `dist/` (generated): This directory will contain the compiled JavaScript output from the TypeScript source, used for production deployments.

### Important Conventions or Patterns

*   **TypeScript**: Employs TypeScript throughout for strong typing, improved code quality, and maintainability.
*   **Configuration Management**: Uses `src/config` to centralize and manage application settings, making it easy to adapt to different environments (development, production). `dotenv` is used to load sensitive or environment-specific variables.
*   **Error Handling**: Implements a centralized error handling strategy using Express middleware (`errorMiddleware.ts`) to provide consistent error responses.
*   **Schema Validation**: `zod` is integrated for robust input and output validation, ensuring data integrity and preventing common API errors.
*   **API Design**: Implied RESTful API principles (though specific routes are not shown) using Express.
*   **Build Process**: Development uses `tsx` and `nodemon` for a streamlined experience, while production builds leverage `tsc` to compile to plain JavaScript.
```