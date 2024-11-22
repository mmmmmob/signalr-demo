using Microsoft.AspNetCore.SignalR;

namespace SignalRWebApi
{
  public class Worker : BackgroundService
  {
    private readonly ILogger<Worker> _logger;
    private readonly IHubContext<TimeHub> _timeHub;
    private string time = DateTime.Now.ToString();
    private int index = 0;
    private bool notification;

    public Worker(ILogger<Worker> logger, IHubContext<TimeHub> timeHub)
    {
      _logger = logger;
      _timeHub = timeHub;
    }
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
      while (!stoppingToken.IsCancellationRequested)
      {
        try
        {
          index++;
          time = DateTime.Now.ToString();

          if (index % 5 == 0)
          {
            notification = true;
          }
          else
          {
            notification = false;
          }

          await _timeHub.Clients.All.SendAsync("RecieveTime", new
          {
            Time = time,
            Index = index,
            Notification = notification
          });

          _logger.LogInformation($"Sent {time}, {index}, {notification}");

          await Task.Delay(1000, stoppingToken);
        }
        catch (Exception ex)
        {
          _logger.LogError(ex, "Error sending data");
        }
      }
    }
  }
}