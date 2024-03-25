# Stage 1: Build frontend
FROM node:14 as frontend_build

# Set the working directory in the container
WORKDIR /frontend

# Copy the frontend source code
COPY FrontEnd/frontend/package.json FrontEnd/frontend/package-lock.json ./
COPY FrontEnd/frontend/public ./public
COPY FrontEnd/frontend/src ./src

# Install dependencies and build frontend
RUN npm install
RUN npm run build

# Stage 2: Create Final Image
FROM nginx:alpine

# Copy built frontend files to nginx public directory
COPY --from=frontend_build /frontend/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run nginx
CMD ["nginx", "-g", "daemon off;"]
