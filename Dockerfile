# Use Node.js as the base image
FROM node:20.3.1

# Set working directory in Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install packages
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application's port
EXPOSE 5555

# Start the application
CMD [ "node", "src/app.js" ]