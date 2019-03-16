@echo off
Title YTM build
echo Translating typescript into javascript...
call npm run-script translate
echo Executing npm build-script...
call npm run-script build
pause