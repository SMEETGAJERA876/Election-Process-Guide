# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Serve stage
FROM node:20-alpine
WORKDIR /app

# Install 'serve' to run the application
RUN npm install -g serve

# Copy the build output from the build stage
COPY --from=build /app/dist ./dist

# Cloud Run sets the PORT environment variable (default 8080)
# -s flag is for single-page applications (routes all requests to index.html)
CMD ["sh", "-c", "serve -s dist -l ${PORT:-8080}"]
