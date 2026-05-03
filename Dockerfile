# Build stage
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
# Copy the custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the built app to NGINX's web root
COPY --from=build /app/dist /usr/share/nginx/html
# Expose port 8080 (Cloud Run default)
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
