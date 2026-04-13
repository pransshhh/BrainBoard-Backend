```markdown
## CONTEXT.md

This document provides a concise overview of the `brainboard-backend` project.

### What this project does

This project is the backend service for "Brainboard," likely a web application. It provides a RESTful API to support the frontend application's functionality, including data persistence.

### Tech Stack and Architecture

*   **Language**: TypeScript
*   **Runtime**: Node.js
*   **Web Framework**: Express.js
*   **Database**: MongoDB
*   **ORM/ODM**: Mongoose (for MongoDB object data modeling)
*   **Environment Variables**: `dotenv` for loading `.env` files.
*   **Schema Validation**: `zod` for robust API input/output validation.
*   **Development Tools**: `nodemon` for hot-reloading, `tsx` for running TypeScript directly in development.
*   **Architecture**: A single-service backend exposing a RESTful API. It follows a layered approach with dedicated directories for configuration, middleware, routes, controllers, services, and models.

### Key Directories and Their Purpose

*   `src/`: Contains all application source code.
    *   `src/config/`: Manages application configuration, including environment-specific settings (`env.ts`) and main configuration entry (`index.ts`).
    *   `src/middlewares/`: Houses Express middleware functions, such as `errorMiddleware.ts` for centralized error handling.
    *   `src/models/`: Defines Mongoose schemas and models for interacting with the MongoDB database.
    *   `src/services/`: Encapsulates business logic and orchestrates operations, often interacting with models.
    *   `src/controllers/`: Contains request handler functions that process incoming API requests, utilize services, and send responses.
    *   `src/routes/`: Defines API endpoints and maps them to specific controller functions.
    *   `src/utils/`: Contains general utility functions (e.g., for logging, helpers).
    *   `src/index.ts`: The primary entry point for the Express application.
*   `dist/` (generated): This directory will contain the compiled JavaScript output from the TypeScript source, used for production deployments.

### Important Conventions or Patterns

*   **TypeScript**: Employs TypeScript throughout for strong typing, improved code quality, and maintainability.
*   **Configuration Management**: Uses `src/config` to centralize and manage application settings, making it easy to adapt to different environments (development, production). `dotenv` is used to load sensitive or environment-specific variables.
*   **Error Handling**: Implements a centralized error handling strategy using Express middleware (`errorMiddleware.ts`) to provide consistent error responses.
*   **Schema Validation**: `zod` is integrated for robust API input and output validation, ensuring data integrity and preventing common API errors.
*   **Database Integration**: Uses Mongoose to define data models and interact with MongoDB, providing an ODM layer for data persistence.
*   **API Structure**: Follows a standard pattern where `src/routes` define endpoints, `src/controllers` handle requests, `src/services` contain business logic, and `src/models` define data structures for the database.
*   **Business Logic Encapsulation**: Business logic is primarily housed within `src/services`, promoting reusability and separation of concerns.
*   **Build Process**: Development uses `tsx` and `nodemon` for a streamlined experience, while production builds leverage `tsc` to compile to plain JavaScript.
```