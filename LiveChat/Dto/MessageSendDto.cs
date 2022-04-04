using System.ComponentModel.DataAnnotations;
using LiveChat.Domain;

namespace LiveChat.Dto;

public class MessageSendDto {
    [MaxLength(ValidationConsts.MaxMessageLength)]
    [Required]
    public string Content { get; set; } = "";
}
