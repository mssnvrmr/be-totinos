# /backend/Dockerfile
FROM node:22

WORKDIR /app

# Copy dependency manifests first to leverage Docker caching
COPY package*.json ./

# Install only production dependencies
RUN yarn install

# Copy the rest of the application backend code
COPY . .

ENV PORT=5000

EXPOSE 5000

CMD ["yarn", "start"]
