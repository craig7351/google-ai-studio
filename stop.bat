@echo off
echo Stopping App Showcase Server...
taskkill /FI "WINDOWTITLE eq AppShowcaseServer" /T /F
echo.
echo Server stopped.
pause
