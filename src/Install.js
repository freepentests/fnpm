import FlagParser from './Modules/Utils/FlagParser.js';
import Readline from './Modules/Utils/Readline.js';
import Registry from './Modules/Registry/Registry.js';

export default class SearchCommand {
	async #getLatestPackageVersion(name) {
		const { versions } = await new Registry().packageInfo(name);
		const latest = Object.keys(versions).slice(-1)[0];

		return latest;
	}

	async execute() {
		const args = new FlagParser().parse(process.argv);

		const packageName = args.args[2];
		const packageVersion = args.get('version')?.value || args.get('v', 'SINGLE_HYPHEN')?.value || await this.#getLatestPackageVersion(packageName); // if no version is explicitly specified, assume the user wants the latest version of the package

		const packageInfo = await new Registry().packageInfo(packageName, packageVersion);

		console.log(`Name: ${packageInfo.name}\n
Description: ${packageInfo.description}\n
Version: ${packageVersion}\n`);

		await Readline.question('Are you sure you want to install this package? (yes): ');
	}
}

new SearchCommand().execute();

