FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the project file and restore dependencies
COPY JobPostingAPI/*.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY JobPostingAPI/ ./
RUN dotnet build -c Release --no-restore
RUN dotnet publish -c Release -o /app/publish --no-build

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://*:$PORT
EXPOSE 8080
ENTRYPOINT ["dotnet", "JobPostingAPI.dll"]
