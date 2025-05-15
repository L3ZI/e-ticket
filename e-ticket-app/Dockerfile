# Build stage
FROM node:24-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Create the missing CSS file that was causing build errors
RUN mkdir -p /app/src/styles && touch /app/src/styles/Studentlist.css

# Copy all files
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files to nginx serve directory - FIXED PATH
COPY --from=build /app/dist /usr/share/nginx/html

# Create public directory structure - ADDED BOTH PATHS
RUN mkdir -p /usr/share/nginx/html/images /share/nginx/html/images /share/nginx/html/assets /usr/share/nginx/html/assets

# Explicitly copy the ticket.png to multiple locations - ADDED BOTH PATHS
COPY --from=build /app/public/ticket.png /usr/share/nginx/html/ticket.png
COPY --from=build /app/public/ticket.png /usr/share/nginx/html/images/ticket.png
COPY --from=build /app/public/ticket.png /usr/share/nginx/html/assets/ticket.png
# Add copies to /share path as well
COPY --from=build /app/public/ticket.png /share/nginx/html/ticket.png
COPY --from=build /app/public/ticket.png /share/nginx/html/images/ticket.png
COPY --from=build /app/public/ticket.png /share/nginx/html/assets/ticket.png

# Set proper permissions
RUN chmod 644 /usr/share/nginx/html/ticket.png /usr/share/nginx/html/images/ticket.png /usr/share/nginx/html/assets/ticket.png \
    /share/nginx/html/ticket.png /share/nginx/html/images/ticket.png /share/nginx/html/assets/ticket.png

# Configure Nginx
RUN echo 'server { \
    listen       80; \
    server_name  localhost; \
    \
    # Set both root paths \
    root   /usr/share/nginx/html; \
    \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # Explicitly handle the ticket.png request with both paths \
    location = /ticket.png { \
        add_header Cache-Control "public, max-age=31536000"; \
        try_files /usr/share/nginx/html/ticket.png /share/nginx/html/ticket.png =404; \
    } \
    \
    # Handle other image requests \
    location ~* \.(png|jpg|jpeg|gif|ico)$ { \
        expires 30d; \
        add_header Cache-Control "public, no-transform"; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]