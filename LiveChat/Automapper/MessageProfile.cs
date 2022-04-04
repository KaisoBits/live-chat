using AutoMapper;
using LiveChat.Dto;
using LiveChat.Entities;

namespace LiveChat.Automapper;

public class MessageProfile : Profile
{
    public MessageProfile()
    {
        CreateMap<Message, MessageReceiveDto>();
    }
}
