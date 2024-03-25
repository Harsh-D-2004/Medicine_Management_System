# Stage 1: Build backend
FROM adoptopenjdk/openjdk11:alpine as backend_build

# Set the working directory in the container
WORKDIR /backend

# Copy the backend source code
COPY BackEnd/service1/src ./src

# Build the application
RUN ./gradlew --no-daemon build -x test

# Stage 2: Create Final Image
FROM adoptopenjdk/openjdk11:alpine

# Set the working directory in the container
WORKDIR /app

# Copy the built JAR file from the backend build stage
COPY --from=backend_build /backend/service1/build/libs/service1.jar ./

# Expose port if needed
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "service1.jar"]
