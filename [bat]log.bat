@echo off
git log --pretty=format:"%%h (%%ar): %%s" --graph
pause;