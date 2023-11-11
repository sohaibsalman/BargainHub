using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Entities;

namespace SearchService.Consumers
{
    public class AuctionCreatedConsumer : IConsumer<AuctionCreated>
    {
        private readonly IMapper _mapper;

        public AuctionCreatedConsumer(IMapper mapper)
        {
            _mapper = mapper;
        }

        public async Task Consume(ConsumeContext<AuctionCreated> context)
        {
            Console.WriteLine("--> Consuming auction created: " + context.Message.Id);

            Item item = _mapper.Map<Item>(context.Message);

            if (item.AuctionEnd < DateTime.UtcNow)
                throw new ArgumentException("Auction end date cannot be in the past");
            
            await item.SaveAsync();
        }
    }
}
