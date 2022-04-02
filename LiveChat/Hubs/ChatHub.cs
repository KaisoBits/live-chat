using LiveChat.Models;
using Microsoft.AspNetCore.SignalR;

namespace LiveChat.Hubs;

public class ChatHub : Hub
{
    public async Task SendMessage(MessageModel message)
    {
        await Clients.All.SendAsync("messagesend", message);
    }
}
