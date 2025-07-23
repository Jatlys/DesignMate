# Stage 1: Build the React frontend
FROM node:18-alpine AS builder-frontend

# Set the working directory for the frontend build
WORKDIR /app

# Copy package.json and package-lock.json from the client directory
COPY client/package.json client/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client-side source code
COPY client/ ./

# Build the application
RUN npm run build

# Stage 2: Setup the FastAPI backend and serve the frontend
FROM python:3.9-slim

# Set the working directory for the backend
WORKDIR /app

# Copy backend dependencies and install them
COPY server/llm_server/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend application code
COPY server/llm_server/ .

# Copy the built frontend from the builder stage
# The build output from 'npm run build' is in the '/app/dist' directory of the builder stage.
COPY --from=builder-frontend /app/dist ./dist

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
