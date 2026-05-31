import FlagParser from './Modules/Utils/FlagParser.js';
import Untar from './Modules/Utils/Untar.js';
import Readline from './Modules/Utils/Readline.js';
import Registry from './Modules/Registry/Registry.js';
import PackageJson from './Modules/Packages/PackageJson.js';

import fs from 'fs';

export default class InstallCommand {
	#getVersionNumberFromSemverString(semverString) {
		const match = semverString.match(/\d+\.\d+\.\d+/g)
		return match ? match[0] : null;
	}

	async #askForConfirmation(packageInfo, packageVersion) {
		console.log(`Name: ${packageInfo.name}\n
Description: ${packageInfo.description}\n
Version: ${packageVersion}\n`);

		const confirmation = await Readline.question('Are you sure you want to install this package? (yes): ') || 'yes';

		if (confirmation !== 'yes') {
			console.log('Received an input other than yes; discarding operation.');
			process.exit(0);
		}
	}

	async #fetchDependentList(packageName, packageVersion, trackedDependencies = {[packageName]: packageVersion}) {
		// recursively traverses the tree of dependents to find out which packages need to be installed
		const packageInfo = await new Registry().packageInfo(packageName, packageVersion);
		const currentPackageDependencies = packageInfo.dependencies ?? {};

		for (const dependencyName of Object.keys(currentPackageDependencies)) {
			if (trackedDependencies[dependencyName]) continue;

			const semverString = currentPackageDependencies[dependencyName];
			const parsedSemverString = this.#getVersionNumberFromSemverString(semverString); // wouldn't really consider it "parsed" but yk what i mean
			trackedDependencies[dependencyName] = parsedSemverString;

			trackedDependencies = await this.#fetchDependentList(dependencyName, parsedSemverString, trackedDependencies);
		};

		return trackedDependencies;
	}

	async #fetchTarball(tarballUrl) {
		const resp = await fetch(tarballUrl);
		const buffer = await resp.arrayBuffer();

		return buffer;
	}

	async #installIndividualDependency(dependencyName, dependencyVersion) {
		const packageInfo = await new Registry().packageInfo(dependencyName, dependencyVersion);
		console.log(dependencyName, dependencyVersion);
		const tarballUrl = packageInfo.dist.tarball;

		const tarball = await this.#fetchTarball(tarballUrl);
		new Untar().extract(tarball);
		fs.renameSync('package', `./node_modules/${dependencyName}`); // package will be the name of the extracted package
	}

	async #installDependencies(dependencyVersions) {
		try {
			fs.accessSync('node_modules');
		} catch(e) {
			fs.mkdirSync('node_modules'); // make node modules dir if it doesn't already exist
		}

		for (const dependencyName of Object.keys(dependencyVersions)) {
			const dependencyVersion = dependencyVersions[dependencyName];
			console.log(dependencyName);
			console.log(dependencyVersion);
			console.log(dependencyVersions);
			await this.#installIndividualDependency(dependencyName, dependencyVersion);
		}
	}

	async #installPackage(packageName, packageVersion) {
		const packageInfo = await new Registry().packageInfo(packageName, packageVersion);

		await this.#askForConfirmation(packageInfo, packageVersion);
		console.log('Fetching Dependency List...');
		const dependencies = await this.#fetchDependentList(packageName, packageVersion);
		console.log('Successfully fetched dependents; proceeding to installation.');
		await this.#installDependencies(dependencies);

		new PackageJson().addDependency(packageName, packageVersion);
	}

	async execute() {
		const args = new FlagParser().parse(process.argv);

		const packageName = args.args[2];
		const packageVersion = args.get('version')?.value || args.get('v', 'SINGLE_HYPHEN')?.value || 'latest'; // if no version is explicitly specified, assume the user wants the latest version of the package

		this.#installPackage(packageName, packageVersion);
	}
}

new InstallCommand().execute();

