using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;
using SearchService.Entities;
using SearchService.RequestHelpers;

namespace SearchService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SearchController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> SearchItems([FromQuery] SearchParams searchParams)
    {
        PagedSearch<Item, Item> query = GetPagedQuery(searchParams);
        var results = await query.ExecuteAsync();

        PagedResult<List<Item>> pagedResults = new()
        {
            Results = results.Results.ToList(),
            TotalCount = (int) results.TotalCount,
            PageCount = results.PageCount,
        };

        return Ok(pagedResults);
    }


    private PagedSearch<Item, Item> GetPagedQuery(SearchParams searchParams)
    {
        PagedSearch<Item, Item> query = DB.PagedSearch<Item, Item>();

        query = searchParams.OrderBy switch
        {
            "make" => query.Sort(x => x.Ascending(a => a.Model)),
            "new" => query.Sort(x => x.Descending(a => a.CreatedAt)),
            _ => query.Sort(x => x.Ascending(a => a.AuctionEnd))
        };

        query = searchParams.FilterBy switch
        {
            "finished" => query.Match(x => x.AuctionEnd < DateTime.UtcNow),
            "endingSoon" => query.Match(x => x.AuctionEnd < DateTime.UtcNow.AddHours(6) && x.AuctionEnd > DateTime.UtcNow),
            _ => query.Match(x => x.AuctionEnd > DateTime.UtcNow)
        };

        if (!string.IsNullOrEmpty(searchParams.Seller))
            query.Match(x => x.Seller == searchParams.Seller);
        if (!string.IsNullOrEmpty(searchParams.Winner))
            query.Match(x => x.Winner == searchParams.Winner);
        if (!string.IsNullOrEmpty(searchParams.SearchTerm))
            query.Match(Search.Full, searchParams.SearchTerm).SortByTextScore();

        query.PageNumber(searchParams.PageNumber);
        query.PageSize(searchParams.PageSize);

        return query;
    }
}
