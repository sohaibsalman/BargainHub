using Microsoft.AspNetCore.Mvc;

namespace SearchService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SearchController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> SearchItems(string searchTerm)
    {
        
    }
}
