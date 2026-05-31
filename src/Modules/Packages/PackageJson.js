import PackageJsonBugBuilder from '../Builders/PackageJsonBugBuilder.js';
import PackageJsonPersonBuilder from '../Builders/PackageJsonPersonBuilder.js';
import PackageJsonRepoObjectBuilder from '../Builders/PackageJsonRepoObjectBuilder.js';

import fs from 'fs';

export default class PackageJson {
	createPackageJson() {
		try {
			fs.accessSync('package.json');
		} catch {
			// file doesn't exist, creating file
			fs.writeFileSync('package.json', '{}');
		}

		return this;
	}

	modifyPackageJson(func) {
		const indentationLevel = 4;

		const packageJsonContents = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
		func(packageJsonContents);
		fs.writeFileSync('package.json', JSON.stringify(packageJsonContents, null, indentationLevel) + '\n');
	}

	setName(name) {
		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.name = name;
		});

		return this;
	}

	setDescription(description) {
		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.description = description;
		});

		return this;
	}

	setVersion(version) {
		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.version = version;
		});

		return this;
	}

	setHomepage(homepage) {
		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.homepage = homepage;
		});

		return this;
	}

	setType(type) {
		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.type = type;
		});

		return this;
	}

	setLicense(license) {
		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.license = license;
		});

		return this;
	}

	setBugs(func) {
		const bugs = new PackageJsonBugBuilder();
		func(bugs);

		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.bugs = bugs;
		});

		return this;
	}

	setAuthor(arg) { // can't think of a better way to name the argument
		// a bit janky but it will be fine for now
		this.modifyPackageJson((packageJsonContents) => {
			if (arg instanceof Function) {
				const author = new PackageJsonPersonBuilder();
				arg(author);

				packageJsonContents.author = author;
			} else {
				packageJsonContents.author = arg;
			}

		});

		return this;
	}

	setRepository(func) {
		const repo = new PackageJsonRepoObjectBuilder();
		func(repo);

		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.repository = repo;
		});

		return this;
	}

	setMain(main) {
		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.main = main;
		});

		return this;
	}

	setBrowser(browser) {
		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.browser = browser;
		});

		return this;
	}

	setMan(man) {
		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.man = man;
		});

		return this;
	}

	setFunding(funding) {
		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.funding = funding;
		});

		return this;
	}

	setBin(bin) {
		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.bin = bin;
		});

		return this;
	}

	addBinEntry(name, jsFilePath) {
		this.modifyPackageJson((packageJsonContents) => {
			if (!packageJsonContents.bin) packageJsonContents.bin = {};

			packageJsonContents.bin[name] = jsFilePath;
		});

		return this;
	}

	addConfigEntry(name, value) {
		this.modifyPackageJson((packageJsonContents) => {
			if (!packageJsonContents.config) packageJsonContents.config = {};

			packageJsonContents.config[name] = value;
		});

		return this;
	}

	addScript(name, script) {
		this.modifyPackageJson((packageJsonContents) => {
			if (!packageJsonContents.scripts) packageJsonContents.scripts = {};

			packageJsonContents.scripts[name] = script;
		});

		return this;
	}

	addDependency(dep, version) {
		this.modifyPackageJson((packageJsonContents) => {
			if (!packageJsonContents.dependencies) packageJsonContents.dependencies = {};

			packageJsonContents.dependencies[dep] = version;
		});

		return this;
	}

	addDevDependency(dep, version) {
		this.modifyPackageJson((packageJsonContents) => {
			if (!packageJsonContents.devDependencies) packageJsonContents.devDependencies = {};

			packageJsonContents.devDependencies[dep] = version;
		});

		return this;
	}

	addPreScript(name, script) {
		this.addScript(`pre${name}`, script);

		return this;
	}

	addPostScript(name, script) {
		this.addScript(`post${name}`, script);

		return this;
	}

	addFile(file) {
		this.modifyPackageJson((packageJsonContents) => {
			if (!packageJsonContents.files) packageJsonContents.files = [];

			packageJsonContents.files.push(file)
		});

		return this;
	}

	addContributor(func) {
		const contributor = new PackageJsonPersonBuilder();
		func(contributor);

		this.modifyPackageJson((packageJsonContents) => {
			if (!packageJsonContents.contributors) packageJsonContents.contributors = [];

			packageJsonContents.contributors.push(contributor);
		});

		return this;
	}

	addKeyword(keyword) {
		this.modifyPackageJson((packageJsonContents) => {
			if (!packageJsonContents.keywords) packageJsonContents.keywords = [];

			packageJsonContents.keywords.push(keyword)
		});

		return this;
	}

	setKeywords(keywords) {
		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.keywords = keywords
		});

		return this;
	}
}

