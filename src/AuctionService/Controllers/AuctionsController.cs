using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.Entities;
using AutoMapper;
using Contracts;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuctionsController : ControllerBase
{
    private readonly AuctionDbContext _context;
    private readonly IMapper _mapper;
    private readonly IPublishEndpoint _publishEndpoint;

    public AuctionsController(AuctionDbContext context, IMapper mapper, IPublishEndpoint publishEndpoint)
    {
        _context = context;
        _mapper = mapper;
        _publishEndpoint = publishEndpoint;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllAuctions()
    {
        List<Auction> auctions = await _context
            .Auctions
            .Include(x => x.Item)
            .OrderBy(x => x.Item.Make)
            .ToListAsync();

        return Ok(_mapper.Map<List<AuctionDto>>(auctions));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAuctionById(Guid id)
    {
        Auction auction = await _context
            .Auctions
            .Include(x => x.Item)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (auction is null) return NotFound();

        return Ok(_mapper.Map<AuctionDto>(auction));
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateAuction(CreateAuctionDto auctionDto)
    {
        Auction auction = _mapper.Map<Auction>(auctionDto);
        auction.Seller = User.Identity.Name;

        _context.Auctions.Add(auction);

        AuctionDto newAuction = _mapper.Map<AuctionDto>(auction);
        await _publishEndpoint.Publish(_mapper.Map<AuctionCreated>(newAuction));
        
        bool result = await _context.SaveChangesAsync() > 0;

        if (!result) return BadRequest("Could not save changes to Db");

        return CreatedAtAction(nameof(GetAuctionById), new { auction.Id }, newAuction);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateAuction(Guid id, UpdateAuctionDto auctionDto)
    {
        Auction auction = await _context
            .Auctions
            .Include(x => x.Item)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (auction is null) return NotFound();

        if (auction.Seller != User.Identity.Name) return Forbid();

        auction.Item.Color = auctionDto.Color ?? auction.Item.Color;
        auction.Item.Make = auctionDto.Make ?? auction.Item.Make;
        auction.Item.Model = auctionDto.Model ?? auction.Item.Model;
        auction.Item.Mileage = auctionDto.Mileage ?? auction.Item.Mileage;
        auction.Item.Year = auctionDto.Year ?? auction.Item.Year;

        AuctionUpdated updatedAuction = _mapper.Map<AuctionUpdated>(auction.Item);
        await _publishEndpoint.Publish(updatedAuction);
        
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteAuction(Guid id)
    {
        Auction auction = await _context
            .Auctions
            .FindAsync(id);
        
        if (auction is null) return NotFound();

        if (auction.Seller != User.Identity.Name) return Forbid();

        _context.Auctions.Remove(auction);
        await _publishEndpoint.Publish(new AuctionDeleted { Id = id.ToString() });
        bool result = await _context.SaveChangesAsync() > 0;

        if (!result) return BadRequest("Could not save changes to Db");
        return Ok();
    }
}
