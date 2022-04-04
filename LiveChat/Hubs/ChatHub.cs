using LiveChat.Dto;
using Microsoft.AspNetCore.SignalR;

namespace LiveChat.Hubs;

public class ChatHub : Hub
{
    public async Task SendMessage(MessageSendDto message)
    {
        await Clients.All.SendAsync("messagesend", message);
    }
}
