using System;
using System.Net.Http;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using BlazorClient;
using BlazorClient.Services;
using Microsoft.Extensions.DependencyInjection;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services
	.AddSingleton(sp => new HttpClient
	{
		BaseAddress = new Uri(builder.HostEnvironment.BaseAddress)
	})
	.AddSingleton<IWikipediaService, WikipediaService>();

await builder.Build().RunAsync();
