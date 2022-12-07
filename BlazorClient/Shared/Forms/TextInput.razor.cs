using System;
using Microsoft.AspNetCore.Components;
using System.Timers;

namespace BlazorClient.Shared.Forms;

public partial class TextInput : IDisposable
{
	private bool _disposed;
	private string? _value;
	private Timer? _timer;

	private int ValueLength => _value?.Length ?? 0;

	[Parameter]
	public RenderFragment ChildContent { get; set; } = default!;

	[Parameter]
	public string Id { get; set; } = Guid.NewGuid().ToString();

	[Parameter]
	public int Interval { get; set; }

	[Parameter]
	public int MinLength { get; set; }

	[Parameter]
	public string? Value
	{
		get => _value;
		set
		{
			if (_value == value) return;

			_value = value;

			if (Interval == 0)
			{
				_ = ValueChanged.InvokeAsync(_value);
				return;
			}

			_timer?.Dispose();
			_timer = new Timer(Interval);
			_timer.Elapsed += OnTick;
			_timer.Enabled = true;
			_timer.Start();
		}
	}

	[Parameter]
	public EventCallback<string?> ValueChanged { get; set; }

	private void OnInput(ChangeEventArgs e)
	{
		Value = e.Value as string;
	}

	private async void OnTick(object? sender, EventArgs e)
	{
		_timer?.Dispose();
		await ValueChanged.InvokeAsync(_value);
	}

	private void Reset() => Value = null;

	public void Dispose()
	{
		Dispose(true);
		GC.SuppressFinalize(this);
	}

	protected void Dispose(bool disposing)
	{
		if (_disposed) return;

		if (disposing)
		{
			if (_timer != null)
			{
				_timer.Elapsed -= OnTick;
				_timer.Dispose();
			}
		}

		_disposed = true;
	}
}