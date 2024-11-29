# **Online Store Management API**

## **Overview**

This project implements an online store management API using NestJS. The application is structured into modular components to manage products, product history, and orders. Designed with scalability and maintainability in mind, it leverages CQRS, Dependency Inversion Principle (DIP), and robust design patterns. The persistence layer is powered by Mongoose, allowing flexible storage for diverse product structures.

---

## **Features**

### **Core Modules**

1. **App Module**:

   - Contains foundational utilities such as:
     - Generic repository implementation.
     - Middlewares.
     - Shared Services.
     - A `BaseEntity` abstract class with built-in functionalities for all entities.

2. **Product Module**:

   - Manages products and categories.
   - Tracks the following:
     - CRUD operations for products.
     - Automatic seeding of categories at startup.
   - Layers:
     - **Application Layer**: Handles commands and queries.
     - **API Layer**: Defines request DTOs and controllers.
     - **Domain Layer**: Encapsulates core business logic, repository interfaces, and DTOs.
     - **Repository Layer**: Implements data persistence with MongoDB.

3. **Product History Module**:

   - Tracks product changes, including:
     - Price updates.
     - Quantity changes.
     - Actions (create, update, delete, purchase).
   - Uses an event-driven approach:
     - Events triggered by actions are caught by event handlers, which write product history.

4. **Order Module**:

   - Manages order submissions and user order lists.
   - Ensures transactional integrity for:
     - Order submission.
     - Reduction of product quantities.
   - Handles race conditions during concurrent requests with proper database operations.
   - Layers:
     - **Application Layer**: Processes commands and queries.
     - **API Layer**: Defines request DTOs and controllers.
     - **Domain Layer**: Contains repository interfaces and business logic.
     - **Repository Layer**: Implements persistence logic with MongoDB.

## **Persistence**

- **Database**: Mongoose for MongoDB.
- Flexible document-based storage accommodates varied product structures, making it ideal for an online store with diverse product types.

---

## **Setup and Usage**

### **Prerequisites**

- Node.js (v20+ recommended)
- npm (v10+ recommended)
- MongoDB service running locally or remotely
- Docker (optional, for containerized deployment)

### **Local Setup**

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```

2. Clone the repository:

   ```bash
   npm install
   ```

3. Create a .env file based on .env.example:
   • Example .env content:

   ```bash
   MONGODB_URI=mongodb://localhost:27017/online-store
   PORT=3000
   ```

4. Start the application in development mode:

   ```bash
   npm run start:dev
   ```

5. API Documentation:

   • Access the API documentation for testing and integration at http://localhost:3000/api.

### **Run Tests**

• To execute all test cases for the application:

    ```bash
    npm run test
    ```

### **Docker Setup**

    1.	Ensure Docker is installed and running on your system.
    2.	Build and run the application using Docker Compose:

    ```bash
    docker compose up
    ```

    3.	The application will be available on http://localhost:3000.

## **Technical Considerations**

    •	Concurrency Handling:
    •	Transactions ensure consistency when reducing product quantities during order submission.
    •	Proper database queries prevent race conditions in concurrent operations.
    •	Scalability:
    •	The modular structure and CQRS pattern allow easy scaling of read and write operations.
    •	Technology-Agnostic Domain Logic:
    •	The domain layer adheres to best practices by separating business logic from infrastructure-specific details.

### **Patterns and Used Principles**

1. **Singleton Pattern**:
   - Ensures single-instance services where appropriate.
2. **Repository Pattern**:
   - Abstracts persistence logic and allows technology-agnostic domain layers.
3. **Dependency Inversion Principle (DIP)**:
   - Interfaces define repository contracts, with MongoDB implementations in the repository layer, transaction execution and id generating
4. **Base Entity Abstraction Design**:
   - The `BaseEntity` class provides reusable functionalities for all entities. This can be extended to follow the Factory Method pattern if needed.
5. **Builder Pattern**:- Use builder pattern to update optional properties in product entity.
