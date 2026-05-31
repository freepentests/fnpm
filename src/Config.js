import FlagParser from './Modules/Utils/FlagParser.js';
import Config from './Modules/Config/Config.js';

import fs from 'fs';

export default class ConfigCommand {
	addConfigEntry(args) {
		new Config().appendConfigEntry(args.get('key').value, args.get('value').value);
		console.log('successfully added that config entry');
	}

	deleteConfigEntry(args) {
		new Config().deleteConfigEntry(args.get('key').value);
		console.log('successfully deleted that config entry');
	}

	getConfig() {
		const configEntries = new Config().getConfig();
		console.log(Object.keys(configEntries).map(key => `${key}=${configEntries[key]}`).join('\n'));
	}

	execute() {
		const args = new FlagParser().parse(process.argv);

		if (args.get('add') || args.get('a', 'SINGLE_HYPHEN')) {
			this.addConfigEntry(args);
		} else if (args.get('delete') || args.get('d', 'SINGLE_HYPHEN')) {
			this.deleteConfigEntry(args);
		} else {
			this.getConfig();
		}
	}
}

