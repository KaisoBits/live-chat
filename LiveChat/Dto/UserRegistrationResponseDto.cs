namespace LiveChat.Dto;

public class UserRegistrationResponseDto
{
    public bool IsSuccessful { get; set; }
    public IEnumerable<string> Errors { get; set; } = Array.Empty<string>();
}
