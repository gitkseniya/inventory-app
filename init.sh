#!/bin/bash

# Run migration commands
echo "Running database migration..."
npx sequelize-cli db:migrate
migration_exit_code=$?

# Check if migration was successful
if [ $migration_exit_code -eq 0 ]; then
  echo "Database migration completed successfully."
else
  echo "Error: Database migration failed. Exiting..."
  exit $migration_exit_code
fi

# Run seeding commands
echo "Running database seeding..."
npx sequelize-cli db:seed:all

# Start the backend service
echo "Starting backend service..."
npx nodemon src/index.ts
