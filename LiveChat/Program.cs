using System.Reflection.Metadata.Ecma335;
using LiveChat.Hubs;
using LiveChat.Models;
using Microsoft.AspNetCore.SignalR;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();
builder.Services.AddSignalR();

builder.Services.AddControllers();

var app = builder.Build();
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
