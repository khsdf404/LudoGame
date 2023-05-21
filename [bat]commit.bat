@echo off
git add .
set /P var="commit message: "
git commit -m "%var%"
git push;