using LiveChat.Entities;

namespace LiveChat.Data;

public static class AppDbContextExtensions
{
    public static T SeedDatabase<T>(this T builder) where T : IApplicationBuilder
    {
        using (var scope = builder.ApplicationServices.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            if (db.Database.EnsureCreated())
            {
                var messages = new[] 
                { 
                    new Message{ Author = "John", Content = "Hi everyone!", Date = DateTime.Now.AddSeconds(-6) },
                    new Message{ Author = "Maria", Content = "Hi Johnny!", Date = DateTime.Now }
                };
                db.Messages.AddRange(messages);

                db.SaveChanges();
            }
        }

        return builder;
    }
}
