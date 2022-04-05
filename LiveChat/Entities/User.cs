using Microsoft.AspNetCore.Identity;

namespace LiveChat.Entities;

public class User : IdentityUser
{
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
}
