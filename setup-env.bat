@echo off
echo 🚀 Setting up EdTech Platform environment files...

REM Copy backend environment file
if not exist "backend\.env" (
    echo 📁 Creating backend .env file...
    copy "backend\env.example" "backend\.env"
    echo ✅ Backend .env created
) else (
    echo ℹ️  Backend .env already exists
)

REM Copy frontend environment file
if not exist "frontend\.env" (
    echo 📁 Creating frontend .env file...
    copy "frontend\env.example" "frontend\.env"
    echo ✅ Frontend .env created
) else (
    echo ℹ️  Frontend .env already exists
)

echo 🎉 Environment setup complete!
echo.
echo Next steps:
echo 1. Review and customize the .env files if needed
echo 2. Run: npm run install:all
echo 3. Run: npm run dev
pause 