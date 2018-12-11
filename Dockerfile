#.net core with sql file process
FROM microsoft/dotnet:2.2-sdk AS builder
WORKDIR /app

RUN curl -sL https://deb.nodesource.com/setup_10.x |  bash -
RUN apt-get install -y nodejs

COPY ./ReactJsAspnetEFSql/*.csproj ./
#RUN dotnet restore ReactJsAspnetEFSql.csproj
COPY ./ReactJsAspnetEFSql ./
RUN dotnet build ReactJsAspnetEFSql.csproj -c Release 
#--no-restore

RUN dotnet publish ReactJsAspnetEFSql.csproj -c Release -o out --no-restore

FROM microsoft/dotnet:2.2-aspnetcore-runtime
WORKDIR /app
COPY --from=builder /app/out .
CMD ASPNETCORE_URLS=http://*:$PORT dotnet ReactJsAspnetEFSql.dll
#ENTRYPOINT ["dotnet", "ReactJsAspnetEFSql.dll"]