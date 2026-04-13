```markdown
# CONTEXT

This document provides a concise overview of the `brainboard-backend` project.

## What this project does

`brainboard-backend` is a Node.js RESTful API serving as the backend for the "Brainboard" application. It's built with Express.js and provides core functionalities for the application, including user authentication, data persistence (using MongoDB), business logic, and exposing RESTful endpoints for a frontend client.

## Tech Stack and Architecture

*   **Language**: TypeScript
*   **Runtime**: Node.js
*   **Web Framework**: Express.js, `cors` for cross-origin resource sharing.
*   **Database**: MongoDB, with Mongoose as the Object Data Modeling (ODM) library.
*   **Authentication**: JSON Web Tokens (JWT) for stateless user authentication.
*   **Configuration**: `dotenv` for environment variables, `zod` for schema validation (e.g., config, request bodies).
*   **Logging**: Winston for structured application logging.
*   **Testing**: Jest for unit and integration testing.
*   **Development Tools**: `nodemon` for live-reloading, `tsx` for direct TypeScript execution in development.
*   **Architecture**: A layered Express application structure, integrating database connectivity, authentication middleware, and feature-based routing.

The application uses a layered architecture, with `src/index.ts` as the entry point initializing the Express app, routes, and middleware. It also establishes the connection to the MongoDB database. Configuration is centralized in `src/config`, and global concerns like error handling and authentication are managed via middleware.

## Key Directories and Their Purpose

*   `src/`: Contains all application source code.
    *   `src/config/`: Houses application configuration, including environment variable loading and validation.
    *   `src/middlewares/`: Stores Express middleware functions, such as `errorMiddleware` for centralized error handling and authentication-related checks.
    *   `src/models/`: Defines Mongoose schemas and models for database entities.
    *   `src/routes/`: Contains route definitions, grouped by resource or feature.
    *   `src/utils/`: Provides utility functions, such as those for JWT token handling or the Winston logger instance.
    *   `src/index.ts`: The main entry point of the application, responsible for setting up the Express server and connecting to the database.
*   `tests/`: Contains unit and integration tests, organized to mirror the `src/` directory structure.

## Important Conventions or Patterns

*   **TypeScript-first**: The project is entirely written in TypeScript, leveraging its type safety and tooling.
*   **Environment-based Configuration**: Configuration is managed using environment variables (loaded via `dotenv`) and structured configuration files within `src/config`, supporting different environments (development, production).
*   **Global Error Handling**: A dedicated `errorMiddleware` is used to catch and handle errors consistently across the application.
*   **Schema Validation**: `zod` is employed for robust schema validation, ensuring data integrity for configurations and API inputs/outputs.
*   **Database Interaction**: Mongoose is used as an ODM for MongoDB, providing schema definition and data interaction.
*   **JWT Authentication**: User authentication is handled using JSON Web Tokens, typically involving a token verification middleware.
*   **Structured Logging**: Winston is configured for structured logging, allowing for easier debugging and monitoring in different environments.
*   **Feature-based Routing**: Routes are organized into separate files under `src/routes/`, improving modularity and maintainability.
*   **Automated Testing**: Jest is used for writing and running comprehensive unit and integration tests, ensuring code quality and functionality.
*   **Standard Scripts**: `dev`, `build`, `start`, and `test` scripts provide a consistent way to run the application in development (using `tsx` and `nodemon`), production (compiled JavaScript), and to execute tests.
```