using System.ComponentModel.DataAnnotations;
using LiveChat.Domain;

namespace LiveChat.Dto;

public record class MessageRecieveDto(
    [MaxLength(ValidationConsts.MaxMessageLength)] string Message,
    string AuthorId,
    DateTime Date,
    string ProfilePicture
);
