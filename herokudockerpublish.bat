::heroku.com publish commands

::Using website publish
::create heroku app using browser login
::using heroku CLI in the root directory of the project execute following commands
::heroku login
::heroku git:remote -a reactjsaspnetcoresql
::heroku buildpacks:set https://github.com/jincod/dotnetcore-buildpack
::heroku buildpacks:add --index 1 heroku/nodejs
::heroku buildpacks -- check for registered buildpacks for the repository/project
::git subtree push --prefix ReactAspnet heroku master    OR    git push heroku master


::Using container build locally & publish

REM - This file assumes that you have access to the application and that you have docker installed
REM : Setup your applications name below using App_Name created on heroku.com
SET APP_NAME="reactjsaspnetcoresql"

REM - Delete all files and folders in publish
del /q ".\ReactAspnet\bin\Release\netcoreapp2.1\publish\*"
FOR /D %%p IN (".\ReactAspnet\bin\Release\netcoreapp2.1\publish\*.*") DO rmdir "%%p" /s /q

dotnet clean --configuration Release
dotnet publish -c Release
copy Dockerfile .\ReactAspnet\bin\Release\netcoreapp2.1\publish\
cd .\bin\Release\netcoreapp2.1\publish\
call heroku login
call heroku container:push web -a %APP_NAME%
call heroku container:release web -a %APP_NAME%


::Using container build at remote & publish
::On heroku.com (free hosting services) build docker container at remote(in heroku platform) and publish app
::add heroku.yml file in the root with required commands
::commit git changes
::heroku stack:set container
::git push -f heroku master