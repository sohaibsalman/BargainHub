using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Entities;

namespace SearchService.Consumers;

public class AuctionUpdatedConsumer : IConsumer<AuctionUpdated>
{
    private readonly IMapper _mapper;

    public AuctionUpdatedConsumer(IMapper mapper)
    {
        _mapper = mapper;
    }

    public async Task Consume(ConsumeContext<AuctionUpdated> context)
    {
        string id = context.Message.Id;
        Console.WriteLine("--> Consuming auction updated: " + id);

        var result = await DB.Update<Item>()
            .MatchID(id)
            .ModifyOnly(x => new { x.Make, x.Model, x.Year, x.Mileage, x.Color }, _mapper.Map<Item>(context.Message))
            .ExecuteAsync();
        
        if (!result.IsAcknowledged)
            throw new MessageException(typeof(AuctionUpdated), "Problem updating the auction");
    }
}
