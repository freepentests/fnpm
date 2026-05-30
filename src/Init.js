import FlagParser from './Modules/FlagParser.js';
import Readline from './Modules/Readline.js';
import PackageJson from './Modules/PackageJson.js';

export default class InitCommand {
	async execute() {
		const packageJson = new PackageJson().createPackageJson();

		const args = new FlagParser().parse(process.argv);
		const autoConfirm = Boolean(args.get('y', 'SINGLE_HYPHEN') || args.get('yes'));

		const name = autoConfirm ? 'my-package' : await Readline.question('package name (my-package): ') || 'my-package';
		const version = autoConfirm ? '1.0.0' : await Readline.question('version (1.0.0): ') || '1.0.0';
		const description = autoConfirm ? '' : await Readline.question('description: ') || '';
		const main = autoConfirm ? 'index.js' : await Readline.question('entry point (index.js): ') || 'index.js';
		const repository = autoConfirm ? '' : await Readline.question('git repository: ') || '';
		const keywords = autoConfirm ? [] : await Readline.question('keywords (comma-separated): ') || [];
		const author = autoConfirm ? '' : await Readline.question('author: ');
		const license = autoConfirm ? 'GPLv3' : await Readline.question('license (GPLv3): ') || 'GPLv3';
		const type = autoConfirm ? 'module' : await Readline.question('type (module): ') || 'module';
		const confirmation = autoConfirm ? 'yes' : await Readline.question('is all this information correct? (yes): ') || 'yes';

		packageJson
			.setName(name)
			.setVersion(version)
			.setDescription(description)
			.setMain(main)
			.setRepository(repoBuilder => repoBuilder.setType('git').setUrl(repository))
			.setKeywords(keywords instanceof Array ? keywords : keywords.split(',').map(item => item.trim()))
			.setAuthor(author)
			.setLicense(license)
			.setType(type);

		console.log('successfully created package.json');

	}
}

