# Gator Grind

## Repository structure

```
- backend
   - .env: environment variables
   - controllers: handles business logic and processes requests from routes
   - middleware: contains functions that run before requests reach routes
   - models: defines database schemas and models
   - routes: defines API endpoints and routes requests to controllers
   - index.js: this is the main server file for the backend

- client
   - public: all pictures/videos/icons/etc stored here
   - src:
      - components: all components are stored here
         - create a folder within to store components for a specific page along with their styles.
      - pages: page components are stored here
         - create a folder within to store a page along with their styles.
      - routes: route components are stored here
      - index.css: default styles that are applied to all components are in this file
      - main.jsx: this is the root component
```

## Prerequisites

1. [Node.js](https://nodejs.org/en)

## Contributing

1. Clone repository to local

```bash
# open a first terminal and clone the repository
git clone https://github.com/vas1l/CEN3031-Project.git
```

2. Install dependencies

```bash
# open a second terminal and install client dependencies
# cd into client folder
npm install

# open a third terminal and install backend dependencies
# cd into backend folder
npm install

# return to root directory
cd ..
```

3. Add .env to backend

   - Right click the backend folder and click new file (reference file structure above if necessary)
   - Create a new file under backend named: .env
   - Paste environment variables (from discord)

4. Change to dev branch

```bash
# open the first terminal and checkout to dev branch
git checkout dev
```

5. Pull most recent changes

```bash
git pull origin dev
# or replace dev with whichever branch you are working on
```

6. Start backend/frontend servers

```bash
# open the second terminal from before and start frontend server
npm run dev

# open the third terminal from before and start backend server
npm start
```
