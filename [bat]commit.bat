@echo off
git add .
set /P varr="branch: "
git checkout "%varr%"
set /P var="commit message: "
git commit -m "%var%"
git push
pause; 