FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Expose the port that Storybook runs on
EXPOSE 6006

# Start Storybook in development mode
CMD ["npm", "run", "dev"] 