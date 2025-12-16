@echo off
title AppShowcaseServer
echo Checking dependencies...
call npm install
cls
echo ===================================================
echo   Starting App Showcase Local Server...
echo   Open http://localhost:3000 in your browser
echo ===================================================
echo.
npm run dev -- --host
pause
