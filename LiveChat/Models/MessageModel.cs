namespace LiveChat.Models;

public record class MessageModel(string Message, string AuthorId, DateTime Date, string ProfilePicture);