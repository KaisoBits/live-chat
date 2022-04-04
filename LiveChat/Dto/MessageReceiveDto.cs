namespace LiveChat.Dto;

public class MessageReceiveDto
{
    public string Content { get; set; } = "";
    public string Author { get; set; } = "";
    public DateTime Date { get; set; }
}