@echo off
git log --pretty=format:"%%h (%%ar): %%s %%d" --graph
pause;