using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Entities;

namespace SearchService.Consumers;

public class BidPlacedConsumer : IConsumer<BidPlaced>
{
    public async Task Consume(ConsumeContext<BidPlaced> context)
    {
        Console.WriteLine("--> Consuming bid placed");
        Item auctionItem = await DB.Find<Item>().OneAsync(context.Message.AuctionId);

        if (context.Message.BidStatus.Contains("Accepted") && context.Message.Amount > auctionItem.CurrentHighBid)
        {
            auctionItem.CurrentHighBid = context.Message.Amount;
            await auctionItem.SaveAsync();   
        }
    }
}
