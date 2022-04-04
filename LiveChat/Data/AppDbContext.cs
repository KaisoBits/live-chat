using LiveChat.Entities;
using Microsoft.EntityFrameworkCore;

namespace LiveChat.Data;

public class AppDbContext : DbContext
{
    public DbSet<Message> Messages => Set<Message>();

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
}
