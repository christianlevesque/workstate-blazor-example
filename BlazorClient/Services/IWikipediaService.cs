using System.Collections.Generic;
using System.Threading.Tasks;
using BlazorClient.Data;

namespace BlazorClient.Services;

public interface IWikipediaService
{
	Task<IEnumerable<ArticleDto>> Search(string input);
}