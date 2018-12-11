# React.Js, .Net Core(2.2) Web Api Sql DB using Entity Framework code first 

Project showcases React.js frontend UI built with Typescript to consume data from the sql database which communicates using .Net Core by exposing Web Api endpoints (for Json output) supplemented by entity framework scaffolded models from database(assuming database already existed)

<br/>

# Steps to get the project running

Pre-requisites:

>1. [.Net Core 2.1 SDK](https://www.microsoft.com/net/download/dotnet-core/2.1)
>2. [Visual Studio Code](https://code.visualstudio.com/) or [Visual Studio Community editon version 15.9.1](https://visualstudio.microsoft.com/vs/community/) or later (recommended) editor

<br/>

Clone the current repository locally as
 `git clone https://github.com/NileshSP/ReactJsAspnet.git`

<br/>

Steps: using Visual Studio code editor
>1. Open the root folder of the downloaded repository 
>2. Await until the project is ready as per the status shown in taskbar which loads required packages in the background
>3. Rename database files 'SampleDatabase.mdf.dbfile' & 'SampleDatabase_log.ldf.dbfile' in 'ReactAspnetSln\ReactAspnet\App_Data' folder to 'SampleDatabase.mdf' & 'SampleDatabase_log.ldf'
>4. Hit -> F5 or select 'Debug -> Start Debugging' option to run the project

<br/>

Steps: using Visual Studio community edition editor
>1. Open the solution file (ReactAspnet.sln) available in the root folder of the downloaded repository
>2. Await until the project is ready as per the status shown in taskbar which loads required packages in the background
>3. Rename database files 'SampleDatabase.mdf.dbfile' & 'SampleDatabase_log.ldf.dbfile' in 'ReactAspnetSln\ReactAspnet\App_Data' folder to 'SampleDatabase.mdf' & 'SampleDatabase_log.ldf'
>4. Hit -> F5 or select 'Debug -> Start Debugging' option to run the project

<br/>

Once the project is build and run, a browser page would be presented with default page and  navigation options on the left as 

1. Home 
2. Counter 
3. Fetch data 
4. Websites data <- `contains functionality related to data access from sql database`


![alt text](https://github.com/NileshSP/ReactJsAspnet/blob/master/screenshot.gif "Working example..")
<br/>

# Root folder contents: 
>1. ReactAspnet folder: contains frontend UI built using React.js and .Net Core Web Api endpoints
>2. ReactAspnetTests folder: unit tests for Web Api Endpoints
>3. ReactAspnet.sln solution file
>4. Readme.md file for project information

