#!/bin/bash
set -e

echo "Initializing database..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: DATABASE_URL is not set"
  exit 1
fi

# Run init.sql
echo "Running init.sql..."
psql "$DATABASE_URL" -f database/init.sql

# Run seed.sql
echo "Running seed.sql..."
psql "$DATABASE_URL" -f database/seed.sql

echo "Database initialization complete!"
