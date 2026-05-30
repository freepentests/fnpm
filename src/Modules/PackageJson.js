import PackageJsonBugBuilder from './Builders/PackageJsonBugBuilder.js':
import PackageJsonPersonBuilder from './Builders/PackageJsonBugBuilder.js':
import PackageJsonRepoObjectBuilder from './Builders/PackageJsonRepoObjectBuilder.js':

import fs from 'fs';

export default class PackageJson {
	createPackageJson() {
		try {
			fs.accessSync('package.json');
		} catch {
			// file doesn't exist, creating file
			fs.writeFileSync('package.json', '{}');
		}
	}

	modifyPackageJson(func) {
		const packageJsonContents = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
		func(packageJsonContents);
		fs.writeFileSync('package.json', JSON.stringify(packageJsonContents);
	}

	setName(name) {
		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.name = name;
		});
	}

	setDescription(description) {
		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.description = description;
		});
	}

	setVersion(version) {
		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.version = version;
		});
	}

	setHomepage(homepage) {
		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.homepage = homepage;
		});
	}

	setLicense(license) {
		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.license = license;
		});
	}

	setBugs(func) {
		const bugs = new PackageJsonBugBuilder();
		func(bugs);

		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.bugs = bugs;
		});
	}

	setAuthor(func) {
		const author = new PackageJsonPersonBuilder();
		func(author);

		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.author = author;
		});
	}

	setRepository(func) {
		const repo = new PackageJsonRepoObjectBuilder();
		func(repo);

		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.repository = repo;
		});
	}

	setMain(main) {
		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.main = main;
		});
	}

	setBrowser(browser) {
		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.browser = browser;
		});
	}

	setMan(browser) {
		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.man = man;
		});
	}

	setFunding(funding) {
		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.funding = funding;
		});
	}

	setBin(bin) {
		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.bin = bin;
		});
	}

	addBinEntry(name, jsFilePath) {
		this.modifyPackageJson((packageJsonContents) => {
			if (!packageJsonContents.bin) packageJsonContents.bin = {};

			packageJsonContents.bin[name] = jsFilePath;
		});
	}

	addConfigEntry(name, value) {
		this.modifyPackageJson((packageJsonContents) => {
			if (!packageJsonContents.config) packageJsonContents.config = {};

			packageJsonContents.config[name] = value;
		});
	}

	addScript(name, script) {
		this.modifyPackageJson((packageJsonContents) => {
			if (!packageJsonContents.scripts) packageJsonContents.scripts = {};

			packageJsonContents.scripts[name] = script;
		});
	}

	addPreScript(name, script) {
		this.addScript(`pre${name}`, script);
	}

	addPostScript(name, script) {
		this.addScript(`post${name}`, script);
	}

	addFile(file) {
		this.modifyPackageJson((packageJsonContents) => {
			if (!packageJsonContents.files) packageJsonContents.files = [];

			packageJsonContents.keywords.push(file)
		});
	}

	addContributor(func) {
		const contributor = new PackageJsonPersonBuilder();
		func(contributor);

		this.modifyPackageJson((packageJsonContents) => {
			if (!packageJsonContents.contributors) packageJsonContents.contributors = [];

			packageJsonContents.contributors.push(contributor);
		});
	}

	addKeyword(keyword) {
		this.modifyPackageJson((packageJsonContents) => {
			if (!packageJsonContents.keywords) packageJsonContents.keywords = [];

			packageJsonContents.keywords.push(keyword)
		});
	}
}

