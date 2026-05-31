import FlagParser from './Modules/Utils/FlagParser.js';
import Registry from './Modules/Registry/Registry.js';

export default class SearchCommand {
	async execute() {
		const args = new FlagParser().parse(process.argv);

		const query = args.args[2];
		const results = await new Registry().search(query);

		const formatted = results.objects.map(result => {
			return `Name: ${result.package.name}
Description: ${result.package.description}
Latest: ${result.package.version}
Updated: ${result.updated}
License: ${result.package.license}
Downloads (monthly, weekly): ${result.downloads.monthly}, ${result.downloads.weekly}`;
		}).join('\n\n');

		console.log(formatted);
	}
}

new SearchCommand().execute();

