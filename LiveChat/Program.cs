using LiveChat.Data;
using LiveChat.Hubs;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();
builder.Services.AddSignalR();

builder.Services.AddDbContext<AppDbContext>(opt => 
    opt.UseSqlite(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddControllers();

var app = builder.Build();

app.SeedDatabase();

app.UseCors(x => x
    .SetIsOriginAllowed(h => true)
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials());

app.UseStaticFiles();
app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapHub<ChatHub>("/chat");
});


if (app.Environment.IsDevelopment())
{
    app.UseSpa(config =>
    {
        config.UseProxyToSpaDevelopmentServer("http://localhost:4200");
    });
}

app.Run();
