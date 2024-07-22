# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN yarn

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN yarn build

# Expose the port the app runs on
EXPOSE 3432

# Define the command to run the app
CMD ["yarn", "start"]