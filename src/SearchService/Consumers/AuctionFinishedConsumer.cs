using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Entities;

namespace SearchService.Consumers;

public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
{
    public async Task Consume(ConsumeContext<AuctionFinished> context)
    {
        Console.WriteLine("--> Consuming auction finished");
        Item auctionItem = await DB.Find<Item>().OneAsync(context.Message.AuctionId);

        if (context.Message.ItemSold)
        {
            auctionItem.Winner = context.Message.Winner;
            auctionItem.SoldAmount = (int) context.Message.Amount;
        }
        auctionItem.Status = "Finished";

        await auctionItem.SaveAsync();
    }
}
