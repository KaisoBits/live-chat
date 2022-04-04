using AutoMapper;
using LiveChat.Data;
using LiveChat.Dto;
using LiveChat.Entities;
using Microsoft.AspNetCore.SignalR;

namespace LiveChat.Hubs;

public class ChatHub : Hub
{
    private readonly AppDbContext _dbContext;
    private readonly IMapper _mapper;

    public ChatHub(AppDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task SendMessage(MessageSendDto message)
    {
        // TODO: Move to AutoMapper
        var msg = new Message { Author = Context.ConnectionId, Content = message.Content, Date = DateTime.UtcNow };
        _dbContext.Messages.Add(msg);
        await _dbContext.SaveChangesAsync();

        var msgRecieve = _mapper.Map<MessageReceiveDto>(msg);
        await Clients.All.SendAsync("messagesend", msgRecieve);
    }
}
