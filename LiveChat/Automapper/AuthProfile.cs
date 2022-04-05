using AutoMapper;
using LiveChat.Dto;
using LiveChat.Entities;

namespace LiveChat.Automapper;

public class AuthProfile : Profile
{
    public AuthProfile()
    {
        CreateMap<UserRegistrationDto, User>()
            .ForMember(src => src.UserName, opt => opt.MapFrom(dst => dst.Email));
    }
}
