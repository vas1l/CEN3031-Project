# Gator Grind

## Repository structure

```
- backend
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
git clone https://github.com/vas1l/CEN3031-Project.git
```

2. Install dependencies

```bash
# install client dependencies
cd client
npm install

# install backend dependencies
cd ../backend
npm install

# return to root directory
cd ..
```

3. Add .env to backend

   - Create a new folder under backend named: .env
   - Paste environment variables

4. Change to dev branch

```bash
git checkout dev
```

5. Move to backend/frontend folder and begin coding

```bash
# for backend
cd backend

# for frontend
cd client
```
