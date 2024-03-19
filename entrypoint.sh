#!/bin/sh

# Wait for MySQL database to become ready
echo "Waiting for MySQL..."
while ! nc -z mysql-db 3306; do
  sleep 1
done
echo "MySQL is ready."

# Run Sequelize migrations
echo "Running API Gateway migrations..."
npx sequelize db:migrate

# Start the API Gateway service
echo "Starting API Gateway..."

