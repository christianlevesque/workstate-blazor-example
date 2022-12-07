using System;

namespace BlazorClient.Data;

public class ArticleDto
{
	public string Title { get; set; } = default!;
	public string Snippet { get; set; } = default!;
	public string? Thumbnail { get; set; }
	public DateTime Timestamp { get; set; }
}