using System.ComponentModel.DataAnnotations;
using LiveChat.Domain;

namespace LiveChat.Dto;

public record class MessageSendDto(
    [MaxLength(ValidationConsts.MaxMessageLength)] string Message);
