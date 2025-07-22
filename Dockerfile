# Stage 1: Build the React frontend
FROM node:18-alpine AS builder-frontend

WORKDIR /app/client

# Copy package configuration and install dependencies
COPY client/package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN npm install

# Copy the rest of the client-side code
COPY client/ .

# Build the application
RUN npm run build

# Stage 2: Build the FastAPI backend and serve the frontend
FROM python:3.9-slim

WORKDIR /app

# Install backend dependencies
COPY server/llm_server/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend application code
COPY server/llm_server/ .

# Copy the built frontend from the builder stage
COPY --from=builder-frontend /app/client/dist ./dist

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
