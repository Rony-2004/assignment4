#!/bin/bash

echo "🚀 Setting up EdTech Platform environment files..."

# Copy backend environment file
if [ ! -f "backend/.env" ]; then
    echo "📁 Creating backend .env file..."
    cp backend/env.example backend/.env
    echo "✅ Backend .env created"
else
    echo "ℹ️  Backend .env already exists"
fi

# Copy frontend environment file
if [ ! -f "frontend/.env" ]; then
    echo "📁 Creating frontend .env file..."
    cp frontend/env.example frontend/.env
    echo "✅ Frontend .env created"
else
    echo "ℹ️  Frontend .env already exists"
fi

echo "🎉 Environment setup complete!"
echo ""
echo "Next steps:"
echo "1. Review and customize the .env files if needed"
echo "2. Run: npm run install:all"
echo "3. Run: npm run dev" 