# Monkay

Monkay is a web application that allows users to manage and view a collection of monkey pictures. Users can add, delete, and view monkey pictures in a paginated format.

## Features

### 1. View Monkey Pictures
- **Description**: Users can view a collection of monkey pictures displayed in a grid format.
- **Pagination**: The list of monkey pictures is paginated to improve performance and usability.

### 2. Add Monkey Picture
- **Description**: Users can add new monkey pictures to the collection.
- **Modal Form**: The form for adding a new monkey picture appears in a modal dialog to provide a smooth user experience.

### 3. Delete Monkey Picture
- **Description**: Users can delete monkey pictures from the collection.
- **Confirmation**: A confirmation button is provided for each picture to prevent accidental deletions.

## Technology Stack

- **Frontend**: Next, TypeScript, Tailwind CSS
- **Backend**: tRPC, Prisma, Node.js
- **Testing**: Vitest, React Testing Library

## Getting Started

### Prerequisites

- Node.js (version 18 or above)
- pnpm (version 8.10.0 or above)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/davit-khachatryan1/monkey-pictures-application.git
   cd monkey-pictures-application
   ```

2. Install dependencies:
   ```sh
   pnpm install
   ```

3. Set up the database:
   ```sh
   run docker(Linux ```docker compose up```, Windows ```docker-compose up```)
   ```

4. Run migrations:
    ```sh
    pnpm prisma migrate dev --name add_monkey_model
    ```
    
5. Start the development server:
   ```sh
   pnpm dev
   ```

### Running Tests

To run the unit tests and ensure everything is working correctly:

```sh
pnpm run test-unit
```

## Project Structure

- **src/components/monkey**: Contains the main components for managing monkey pictures (e.g., `CreateMonkeyForm`, `MonkeyList`, `MonkeyPage`).
- **src/server/routers**: Contains the tRPC routers for handling API requests.
- **src/utils/trpc**: Contains the tRPC setup and utility functions.
- **tests**: Contains the test files for various components and functionality.

## API Routes

### Monkeys

- **GET /api/monkeys**: Retrieve a list of monkey pictures with pagination.
- **POST /api/monkeys**: Add a new monkey picture.
- **DELETE /api/monkeys/:id**: Delete a monkey picture by ID.
