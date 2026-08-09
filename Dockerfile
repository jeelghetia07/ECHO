# Monolith: Vite frontend + Express API. Build from repo root
# We are creating a single Docker image that will contain both the frontend and the backend (monolithic deployment).


                            # -----------------------------
                            # Stage 1: Build the Frontend
                            # -----------------------------



# Use the official Node.js 22 image as the base image.
# "bookworm-slim" is a lightweight Debian Linux image with Node pre-installed.
# "AS frontend-build" gives this stage a name so we can refer to it later.
FROM node:22-bookworm-slim AS frontend-build

# Set the working directory inside the Docker container.
# If this folder doesn't exist, Docker creates it automatically.
# All following commands (COPY, RUN, etc.) execute from here.
WORKDIR /app/frontend

# Copy only package.json and package-lock.json first.
# This is done for Docker layer caching.
# If only source code changes later, Docker won't reinstall all packages.
# node_modules layer instead of reinstalling everything.
COPY frontend/package.json frontend/package-lock.json ./

# Install all frontend dependencies.
# --no-audit : skips npm security audit (faster build)
# --no-fund  : skips funding messages, cause some packages ask for donations
# --legacy-peer-deps : ignores peer dependency conflicts
# (Useful when some packages don't have compatible peer versions.)
RUN npm install --no-audit --no-fund --legacy-peer-deps

# Copy the remaining frontend source code
# (src/, public/, vite.config.js, etc.)
# into the working directory.
COPY frontend/ ./

# Empty API URL means the frontend will call "/api/..."
# Since frontend and backend will be hosted on the SAME domain,
# the browser automatically sends requests to:
# https://your-domain.com/api/...
# instead of http://localhost:3000/api/...
ENV VITE_API_URL=

# Build Argument:
# The value is supplied only while building the Docker image.
# Example:
# docker build --build-arg VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx .
ARG VITE_CLERK_PUBLISHABLE_KEY

# Convert the build argument into an environment variable
# so Vite can access it during "npm run build".
#
# Inside React, this can be accessed using:
# import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
#
# Since this is the *Publishable* key, it is safe to include
# in the frontend JavaScript.
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY

# Build the production version of the React (Vite) application.
#
# This runs:
#     vite build
#
# It DOES NOT modify the source files (App.jsx, Login.jsx, etc.).
#
# Instead, it creates a new "dist/" folder containing optimized
# HTML, CSS and JavaScript files that browsers can understand.
#
# Example:
#
# Before:
#   src/
#     App.jsx
#     Login.jsx
#     main.jsx
#
# After:
#   dist/
#     index.html
#     assets/
#       index-a83d2.js    <- Entire React app bundled & minified
#       index-71c22.css   <- Optimized CSS
#
# These files are what will actually be served to users in production.
RUN npm run build









                            # -----------------------------
                            # Stage 2: Build the Backend
                            # -----------------------------




# Use Node.js 22 as the base image for building the backend.
# Give this stage the name "backend-build" so later stages
# can copy files from it if needed.
FROM node:22-bookworm-slim AS backend-build

# Set the working directory inside the Docker image.
# Creates /app if it doesn't already exist and makes it
# the current directory for all following commands.
WORKDIR /app

# Copy only package.json and package-lock.json first.
# This allows Docker to cache the npm install layer.
# If only backend source files change later, Docker won't
# reinstall all dependencies.
COPY backend/package.json backend/package-lock.json ./

# Install backend dependencies.
#
# --no-audit : Skip npm security audit (faster build)
# --no-fund  : Hide package funding messages
RUN npm install --no-audit --no-fund

# Copy the remaining backend source code into /app.
# (src/, routes/, models/, middleware/, etc.)
COPY backend/ ./

# Build the backend.
#
# This executes:
#     npm run build
#
# In this project, the backend is written in JavaScript (ES Modules),
# not TypeScript.
#
# Here, the build script simply copies the source code into a "dist/"
# folder instead of compiling it.
#
# Example:
#
# Before:
#   src/
#     server.js
#     routes/
#     controllers/
#
# After:
#   dist/
#     server.js
#     routes/
#     controllers/
#
# The "dist/" folder will be used later in the final Docker image.
RUN npm run build






                            # -----------------------------
                            # Stage 3: Final Runtime Image
                            # -----------------------------





# This is the final Docker image that will actually run on the server.
# It does NOT contain the frontend source code or backend source code.
# It only contains:
#   - Production dependencies
#   - Built backend (dist/)
#   - Built frontend (public/)
#
# This makes the image much smaller and more secure.

FROM node:22-bookworm-slim AS runner

# Create /app and make it the current working directory.
WORKDIR /app

# Tell Node that this is a production environment.
# Many libraries behave differently in production:
# - Faster performance
# - Better caching
# - Less logging/debugging
# - Express disables some development features
ENV NODE_ENV=production

# Port on which the Express server will run inside the container.
ENV PORT=3001

# Copy only package.json files.
# We only need them to install runtime dependencies.
COPY backend/package.json backend/package-lock.json ./

# Install ONLY production dependencies.
#
# --omit=dev skips devDependencies like nodemon.
#
# Example:
#
# Installed:
#   express
#   mongoose
#   dotenv
#
# NOT Installed:
#   nodemon
#
# Finally remove npm cache to reduce image size.
RUN npm install --omit=dev --no-audit --no-fund && npm cache clean --force

# Copy the backend build output from Stage 2.
#
# backend-build already created:
#
# /app/dist
#
# Now copy that folder into this final image.
COPY --from=backend-build /app/dist ./dist

# Copy the built React application from Stage 1.
#
# frontend-build already created:
#
# /app/frontend/dist
#
# Copy it into ./public so Express can serve it as static files.
COPY --from=frontend-build /app/frontend/dist ./public

# Run the application as the non-root "node" user.
# This follows the principle of least privilege: if the app is compromised,
# it won't have full administrator (root) permissions inside the container.
USER node

# Default command executed when the container starts.
# Equivalent to running:
#     node dist/index.js
# This starts the Express backend server.
CMD ["node", "dist/index.js"]


