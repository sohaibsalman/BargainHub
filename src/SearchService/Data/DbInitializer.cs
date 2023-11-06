using System.Text.Json;
using MongoDB.Driver;
using MongoDB.Entities;
using SearchService.Entities;

namespace SearchService.Data;

public class DbInitializer
{
    public static async Task Initialize(WebApplication app)
    {
        await DB.InitAsync("search", MongoClientSettings
            .FromConnectionString(app.Configuration.GetConnectionString("MongoDbConnection")));

        await DB.Index<Item>()
            .Key(x => x.Make, KeyType.Text)
            .Key(x => x.Model, KeyType.Text)
            .Key(x => x.Color, KeyType.Text)
            .CreateAsync();

        long count = await DB.CountAsync<Item>();
        if (count == 0)
        {
            Console.WriteLine("No data found - seeding data into DB");
            string itemData = await File.ReadAllTextAsync("Data/auctions.json");
            List<Item> items = JsonSerializer.Deserialize<List<Item>>(itemData, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            await DB.SaveAsync(items);
        }
    }
}
