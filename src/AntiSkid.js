import FlagParser from './Modules/Utils/FlagParser.js';
import Config from './Modules/Config/Config.js';

import path from 'node:path';
import fs from 'fs';
import os from 'os';

export default class AntiSkidCommand {
	enableAntiSkid(args) {
		const antiSkidTargetUser = args.args[3];
		new Config().deleteConfigEntry('antiskid', antiSkidTargetUser);
		new Config().appendConfigEntry('antiskid', 'enabled', antiSkidTargetUser);
	}

	disableAntiSkid(args) {
		const antiSkidTargetUser = args.args[3];
		new Config().deleteConfigEntry('antiskid', antiSkidTargetUser);
	}

	execute() {
		if (os.userInfo().username !== 'root') {
			return console.error('You need to be root in order to toggle anti-skid policies.\n\nThis is necessary to prevent unauthorized users disabling the anti-skid policies for themselves; an administrative user must be present in order to grant skidding abilities to people.\n(this is actually completely useless because an unauthorized user could just delete the fnpmrc file in their own home directory since they have rights to delete that file, but a skid wouldn\'t know where to find the fnpmrc file).');
		}

		const args = new FlagParser().parse(process.argv);

		if (args.get('enable') || args.get('e', 'SINGLE_HYPHEN')) {
			this.enableAntiSkid(args);
		} 

		if (args.get('disable') || args.get('d', 'SINGLE_HYPHEN')) {
			this.disableAntiSkid(args);
		}
	}
}

