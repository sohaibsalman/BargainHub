using MongoDB.Driver;
using MongoDB.Entities;
using SearchService.Data;
using SearchService.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();


var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseAuthorization();

app.MapControllers();

try
{
    await DbInitializer.Initialize(app);
}
catch (Exception ex)
{
    Console.WriteLine(ex);
}

app.Run();
