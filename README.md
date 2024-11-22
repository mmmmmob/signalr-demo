# SignalR Demo

A simple demonstration of using SignalR for real-time web applications. This project showcases the integration of SignalR in a web application and in a simple console receiver to enable real-time communication between the server and clients.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [.NET SDK 9.0](https://dotnet.microsoft.com/download)
- Your preferred JavaScript runtime
  - [Node.js](https://nodejs.org/en)
  - [Bun](https://bun.sh/)
  - [Deno](https://deno.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mmmmmob/signalr-demo.git
   cd signalr-demo
   ```

2. Restore required dependencies and building SignalR server

   ```bash
   cd signalR-WebAPI
   dotnet restore
   dotnet run
   ```

3. If you prefer to see a live demo implemented on React web application, headed to SignalR-WebDemo and install dependencies before running (example code below using NPM)

   ```bash
   cd signalR-WebDemo
   npm install
   npm run dev
   ```

4. There is also a demo on how SignalR working with console application in SignalR-Reciever folder (Yes, it was misspelled...)

   ```bash
   cd signalR-Reciever
   dotnet restore
   dotnet run
   ```

## Acknowledgments

This SignalR demo repository is based on these tutorial articles with some adjustments

- [Integrating SignalR with React TypeScript and ASP.NET Core](https://www.roundthecode.com/dotnet-tutorials/integrating-signalr-with-react-typescript-and-asp-net-core) by Round the Code
- [Building Real-Time Notifications in .NET Core 8 Minimal APIs using SignalR](https://medium.com/@umairg404/building-real-time-notifications-in-net-core-8-minimal-apis-using-signalr-c2eb9edfb68c) by Umair Rasheed
