using Microsoft.AspNetCore.SignalR;

namespace SignalRWebApi
{
  public class TimeHub : Hub
  {
    // These below can be use as a method for handling message sending from client (not using right now)
    public async Task SendTime(string time, int index, bool notification)
    {
      await Clients.All.SendAsync(time, index, notification);
    }
    public async Task onConnectedAsync()
    {
      string connectionId = Context.ConnectionId;
      await base.OnConnectedAsync();
    }
  }
}