# Root directory Dockerfile - simple version
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the backend project
COPY JobPostingAPI/ ./
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://*:$PORT
EXPOSE 8080
ENTRYPOINT ["dotnet", "JobPostingAPI.dll"]
