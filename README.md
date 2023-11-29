# Project Setup Guide

This guide will walk you through setting up and running a project, both with and without Docker. The project involves a Node.js application and a PostgreSQL database, providing API endpoints.

## Setting Up With Docker

1. **Prerequisites:**
- Ensure you have Docker installed on your system.
- Make sure that ports 5000, 5432, 3000, and 8080 are available.

2. **Build and Start Docker Containers:**
- cd root
    ```bash
    docker-compose up
    ```

3. **Accessing pgAdmin:**
- After starting the Docker containers or if you have a locally installed PostgreSQL database, visit:
      `http://localhost:8080`

Once the setup is complete, interact with the project's API endpoints hosted at:
`http://localhost:3000/`


### 4. API Endpoints:

#### 4.1. Get all Cases (GET):
- No parameters required.

    ```bash
    http://localhost:3000/api/case

    ```

#### 4.2. update the Case (PUT):
- No Parameter
    ```bash
    http://localhost:3000/api/case/id
    ```

#### 4.5 create new Case (POST):
- Pass the below in formdata or raw json 

    customerName:string
    startDate: date
    isFinished: boolean
    ```bash
    http://localhost:3000/api/case
    ```   

#### 4.6 Deleting Case (DELETE):**
- pass the id
    ```bash
    http://localhost:3000/api/case/id
    ```

5. **Prerequisites:**
- Ensure you have PostgreSQL installed on your system.
- Setup the database credentials for the PostgreSQL setup.

6. **Navigate to the project's root directory:**
    ```bash
    cd root/back-end
    ```

7. **Database Setup:**
    ```bash
    cd root/config
    ```
    
- Change the database config as per your setup:
    - Host: localhost
    - User: postgres
    - Password: postgres
    - Database: postgres
    - Port: 5432

8. **Install Dependencies:**
    ```bash
    npm install
    ```

9. **Create Build:**
    ```bash
    npm run build

10. **Run Migrations for creating tarrif table:**
- Make sure that you have database postgres connected with the app
    ```bash
    npx knex migrate:latest --env development
    ```

11. **Run Seeders for inserting dummy data**
    ```bash
    npx knex seed:run --env development
    ```

12. **Run the test:**
    ```bash
    npm run test
    ```

13. **Run the project:**
    ```bash
    npm start
    ```


14. **Setting React:**
    ```bash
    cd front-end 
    ```

15. **Install the project's dependencies by running:**
- cd front-ent
    ```bash
    npm install
    ```

16. **Run the project:**
    ```bash
    npm start
    ```

Thank you for your consideration. Follow these instructions to set up and run the project successfully.
    