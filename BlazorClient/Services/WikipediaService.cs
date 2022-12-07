using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using BlazorClient.Data;
using Microsoft.Extensions.Logging;

namespace BlazorClient.Services;

public class WikipediaService : IWikipediaService
{
	private readonly HttpClient _client;
	private readonly ILogger<WikipediaService> _logger;

	private readonly Dictionary<string, string> _defaultParams = new()
	{
		{ "action", "query" },
		{ "format", "json" },
		{ "formatversion", "2" }, // use UTF-8
		{ "origin", "*" } // enable cross-origin requests
	};

	public WikipediaService(
		HttpClient client,
		ILogger<WikipediaService> logger)
	{
		_client = client;
		_logger = logger;
	}

	public async Task<IEnumerable<ArticleDto>> Search(string input)
	{
		_logger.LogInformation(
			"Starting request to Wikipedia search API for string {}", 
			input);

		var parameters = new Dictionary<string, string>(_defaultParams)
		{
			{ "list", "search" },
			{ "srsearch", input }
		};

		var result = await Send(parameters);
		var articles = result?.Query?.Search;
		if (articles is null)
		{
			return Array.Empty<ArticleDto>();
		}

		await Task.WhenAll(articles.Select(HydrateThumbnail));
		return articles;
	}

	protected async Task HydrateThumbnail(ArticleDto article)
	{
		var parameters = new Dictionary<string, string>(_defaultParams)
		{
			{ "piprop", "thumbnail" },
			{ "pilimit", "1" },
			{ "pithumbsize", "250" },
			{ "redirects", "1" },
			{ "prop", "pageimages" },
			{ "titles", article.Title }
		};

		var result = await Send(parameters);
		article.Thumbnail = result?.Query?.Pages?.FirstOrDefault()?.Thumbnail?.Source;
	}

	protected async Task<ResponseDto?> Send(Dictionary<string, string> queryParams)
	{
		var message = new HttpRequestMessage(
			HttpMethod.Get,
			$"https://en.wikipedia.org/w/api.php?{CreateQueryString(queryParams)}");

		HttpResponseMessage response;
		try
		{
			response = await _client.SendAsync(message);
			if (!response.IsSuccessStatusCode)
			{
				_logger.LogWarning(
					"Failed to fetch data from Wikipedia API. Response message: {}",
					await response.Content.ReadAsStringAsync());
				return null;
			}
		}
		catch (Exception e)
		{
			_logger.LogError(e, "Failed to fetch data from Wikipedia API");
			return null;
		}

		try
		{
			var results = await response.Content.ReadFromJsonAsync<ResponseDto>(new JsonSerializerOptions
			{
				PropertyNameCaseInsensitive = true
			});

			return results;
		}
		catch (Exception e)
		{
			_logger.LogError(e, "Failed to deserialize data from Wikipedia API");
			return null;
		}
	}

	protected static string CreateQueryString(Dictionary<string, string> parameters)
	{
		var queryString = new StringBuilder();

		foreach (var (param, value) in parameters)
		{
			queryString.Append($"{param}={value}&");
		}

		return queryString.ToString();
	}
}