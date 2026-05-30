export default class Readline {
	static interface = null;

	static question(prompt, options) {
		return new Promise((resolve, reject) => {
			if (options && options.masked) process.stdin.setRawMode(true);
			process.stdout.write(prompt);

			let buffer = new Uint8Array();

			const onData = data => {
				buffer = new Uint8Array([...buffer, ...data]);
				const textData = new TextDecoder().decode(data)

				if (textData.endsWith('\r') || textData.endsWith('\n')) {
					if (options && options.masked) process.stdout.write('\r\n');
					if (options && options.masked) process.stdin.setRawMode(false);

					process.stdin.removeListener('data', onData);
					process.stdin.pause();
					return resolve(new TextDecoder().decode(buffer).slice(0, new TextDecoder().decode(buffer).length - 1));
				}

				if (options && options.masked) process.stdout.write('*');
			}

			process.stdin.on('data', onData);
		});
	}
}

