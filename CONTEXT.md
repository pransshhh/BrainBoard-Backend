```markdown
# CONTEXT

This document provides a concise overview of the `brainboard-backend` project.

## What this project does

`brainboard-backend` is a Node.js RESTful API serving as the backend for the "Brainboard" application. It's built with Express.js and provides core functionalities for the application, likely handling data storage, business logic, and exposing endpoints for a frontend client.

## Tech Stack and Architecture

*   **Language**: TypeScript
*   **Runtime**: Node.js
*   **Web Framework**: Express.js
*   **Configuration**: `dotenv` for environment variables, `zod` for schema validation (e.g., config, request bodies).
*   **Development Tools**: `nodemon` for live-reloading, `tsx` for direct TypeScript execution in development.
*   **Architecture**: Standard Express application structure with dedicated directories for configuration and middleware.

The application uses a layered architecture, with `src/index.ts` as the entry point initializing the Express app, routes, and middleware. Configuration is centralized in `src/config`, and global concerns like error handling are managed via middleware.

## Key Directories and Their Purpose

*   `src/`: Contains all application source code.
    *   `src/config/`: Houses application configuration, including environment variable loading and validation.
    *   `src/middlewares/`: Stores Express middleware functions, such as `errorMiddleware` for centralized error handling.
    *   `src/index.ts`: The main entry point of the application, responsible for setting up the Express server.

## Important Conventions or Patterns

*   **TypeScript-first**: The project is entirely written in TypeScript, leveraging its type safety and tooling.
*   **Environment-based Configuration**: Configuration is managed using environment variables (loaded via `dotenv`) and structured configuration files within `src/config`, supporting different environments (development, production).
*   **Global Error Handling**: A dedicated `errorMiddleware` is used to catch and handle errors consistently across the application.
*   **Schema Validation**: `zod` is employed for robust schema validation, ensuring data integrity for configurations and potentially API inputs/outputs.
*   **Standard Scripts**: `dev`, `build`, and `start` scripts provide a consistent way to run the application in development (using `tsx` and `nodemon`) and production (compiled JavaScript).
```