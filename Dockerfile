# Use an official Node.js runtime as a parent image
FROM node:20.18.0-alpine3.20

# Install yt-dlp dependencies
RUN apk add --no-cache python3 py3-pip ffmpeg

# Create and activate a Python virtual environment
RUN python3 -m venv /opt/venv

# Activate virtual environment and install yt-dlp
RUN /opt/venv/bin/pip install yt-dlp

# Make the virtual environment available globally by adjusting PATH
ENV PATH="/opt/venv/bin:$PATH"

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install Node.js dependencies (if needed for your app)
RUN npm install

RUN npm install --global nodemon

# Expose the desired port (if your Node.js app runs a server, e.g., 3000)
EXPOSE 3000

# Define the command to run your app (this can be a Node.js script or anything)
# TODO: split on CMD and ENTRYPOINT
ENTRYPOINT ["npm", "run", "start"]
