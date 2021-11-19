using System.ComponentModel;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;

namespace WiFiSurveyor;

public abstract class PosixSignalReader : ISignalReader<string>
{
	private readonly ICommandService _commandService;
	protected abstract ProcessStartInfo Info { get; }

	protected PosixSignalReader(ICommandService commandService)
	{
		_commandService = commandService;
	}

	public async Task<string> Read()
	{
		try
		{
			return await _commandService.Run(Info);
		}
		catch (Win32Exception e)
		{
			switch (e.NativeErrorCode)
			{
				case 2:
					var msg = $"Executable \"{Info.FileName}\" was not found. Please ensure \"wireless-tools\" is installed and \"{Assembly.GetExecutingAssembly().GetName().Name}\" is running as root.";
					throw new FileNotFoundException(msg, Info.FileName, e);
				default:
					throw;
			}
		}
	}
}
