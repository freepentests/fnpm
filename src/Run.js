import FlagParser from './Modules/Utils/FlagParser.js';

import { exec } from 'child_process';
import fs from 'fs';

export default class RunCommand {
	execute() {
		const args = new FlagParser().parse(process.argv);
		const scriptToRun = args.args[3];

		const jsonData = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
		const scriptContents = jsonData.scripts[scriptToRun];

		exec(scriptContents, (error, stdout, stderr) => {
			if (error) {
				throw new Error(error);
			}

			if (stderr) {
				process.stderr.write(stderr);
			}

			if (stdout) {
				process.stdout.write(stdout);
			}
		});
	}
}

