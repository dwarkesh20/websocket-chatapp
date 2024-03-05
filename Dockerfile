# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-ea-17-jdk-slim

# Set the working directory to /app
WORKDIR /app

# Copy the application JAR file into the container at /app
COPY target/demo-0.0.1-SNAPSHOT.jar /app/

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run the JAR file when the container launches
CMD ["java", "-jar", "demo-0.0.1-SNAPSHOT.jar"]
