using System.Text.Json;
using Microsoft.AspNetCore.SignalR.Client;

string hubUrl = "http://localhost:5179/notification-test";
var hubConnection = new HubConnectionBuilder().WithUrl(hubUrl).Build();

hubConnection.On<dynamic>("ReceiveTime", (data) =>
{
  // Convert dynamic to a JSON string
  var json = data.ToString();

  // Parse the JSON string into a JsonDocument
  var jsonDocument = JsonDocument.Parse(json);
  var root = jsonDocument.RootElement;

  // Extract values from the JSON (strongly-type)
  string time = root.GetProperty("time").GetString();
  int index = root.GetProperty("index").GetInt32();
  bool notification = root.GetProperty("notification").GetBoolean();

  Console.WriteLine($"Message received ->\nTime: {time}\nIndex: {index}\nNotification: {notification}");
  Console.WriteLine("------------------------");
});

try
{
  hubConnection.StartAsync().Wait();
  Console.WriteLine("SignalR Connection Started");
}
catch (Exception ex)
{
  Console.WriteLine($"Error connecting to SignalR: {ex.Message}");
  throw;
}

CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
var cancellationToken = cancellationTokenSource.Token;

Console.CancelKeyPress += (sender, a) =>
{
  a.Cancel = true;
  Console.WriteLine("Stopping SignalR connection...");
  cancellationTokenSource.Cancel();
};

try
{
  await Task.Delay(Timeout.Infinite, cancellationToken);
}
catch (TaskCanceledException)
{
}
await hubConnection.StopAsync();

Console.WriteLine("SignalR connection closed.");