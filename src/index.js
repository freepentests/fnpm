#!/bin/node

import FlagParser from './Modules/Utils/FlagParser.js';
import InitCommand from './Init.js';
import InstallCommand from './Install.js';
import RunCommand from './Run.js';
import SearchCommand from './Search.js';

const main = () => {
	const args = new FlagParser().parse(process.argv);
	const command = args.args[2];

	switch (command) {
		case 'init':
			new InitCommand().execute();
			break;

		case 'run':
			new RunCommand().execute();
			break;

		case 'install':
			new InstallCommand().execute();
			break;

		case 'search':
			new SearchCommand().execute();
			break;

		default:
			console.log('Invalid command.');
			break;
	}
};

main();

