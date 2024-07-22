# Use an official Node.js runtime as the base image
FROM node:20.15.1-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN yarn

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN yarn build

# Expose the port the app runs on (default for Next.js is 3000)
EXPOSE 3000

# Define the command to run the app
CMD ["yarn", "start"]