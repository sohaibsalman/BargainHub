namespace SearchService.RequestHelpers;

public class PagedResult<T>
{
    public T Results { get; set; }
    public int PageCount { get; set; }
    public int TotalCount { get; set; }
}
