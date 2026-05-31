import FlagParser from './Modules/Utils/FlagParser.js';
import Untar from './Modules/Utils/Untar.js';
import Readline from './Modules/Utils/Readline.js';
import Registry from './Modules/Registry/Registry.js';
import PackageJson from './Modules/Packages/PackageJson.js';

import path from 'node:path';
import fs from 'fs';
import crypto from 'crypto';

class CustomError extends Error {
	constructor(message, name) {
		super(message);
		this.name = name;
	}
}

export default class InstallCommand {
	#getVersionNumberFromSemverString(semverString) {
		const match = semverString.match(/\d+\.\d+\.\d+/g);
		if (!match && parseInt(semverString)) return `${parseInt(semverString)}.0.0`;
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
			if (!parsedSemverString) trackedDependencies[dependencyName] = 'latest';

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
		const packageInfo = await new Registry().packageInfo(dependencyName, dependencyVersion || 'latest');
		const tarballUrl = packageInfo.dist.tarball;

		const tarball = await this.#fetchTarball(tarballUrl);
		const calculatedShaSum = crypto.createHash('sha1').update(new Uint8Array(tarball)).digest('hex');
		if (calculatedShaSum !== packageInfo.dist.shasum) {
			throw new CustomError('Calculated SHA-1 checksum does not match that which is specified in registry API response. It is possible that the tarball may have been tampered with.', 'ShaSumMismatchError');
		}
		
		new Untar().extract(tarball);

		const nodeModulesPath = `./node_modules/${dependencyName}`;
		if (!fs.existsSync(path.dirname(nodeModulesPath))) fs.mkdirSync(path.dirname(nodeModulesPath), { recursive: true });
		if (fs.existsSync('package')) fs.renameSync('package', `./node_modules/${dependencyName}`); // "package" is the name of the extracted tarball
	}

	async #installDependencies(dependencyVersions) {
		try {
			fs.accessSync('node_modules');
		} catch(e) {
			fs.mkdirSync('node_modules'); // make node modules dir if it doesn't already exist
		}

		for (const dependencyName of Object.keys(dependencyVersions)) {
			const dependencyVersion = dependencyVersions[dependencyName];
			await this.#installIndividualDependency(dependencyName, dependencyVersion);
		}
	}

	async #getLatestPackageVersion(packageName) {
		return (await new Registry().packageInfo(packageName, 'latest')).version;
	}

	async #installPackage(packageName, packageVersion) {
		const packageInfo = await new Registry().packageInfo(packageName, packageVersion);

		await this.#askForConfirmation(packageInfo, packageVersion);
		console.log('Fetching Dependency List...');
		const dependencies = await this.#fetchDependentList(packageName, packageVersion);
		console.log('Successfully fetched dependents; proceeding to installation.');
		await this.#installDependencies(dependencies);

		new PackageJson().addDependency(packageName, packageVersion === 'latest' ? await this.#getLatestPackageVersion(packageName) : packageVersion);
	}

	async execute() {
		const args = new FlagParser().parse(process.argv);

		const packageName = args.args[2];
		const packageVersion = args.get('version')?.value || args.get('v', 'SINGLE_HYPHEN')?.value || 'latest'; // if no version is explicitly specified, assume the user wants the latest version of the package

		this.#installPackage(packageName, packageVersion);
	}
}

new InstallCommand().execute();

