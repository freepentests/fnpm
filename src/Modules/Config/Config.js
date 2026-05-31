import path from 'node:path';
import os from 'os';
import fs from 'fs';

const FNPMRCPATH = path.join(os.homedir(), '.fnpmrc');

export default class Config {
	getConfig() {
		const fileData = fs.readFileSync(FNPMRCPATH, 'utf-8');
		const entries = fileData.split('\n').filter(entry => entry);
		let entriesObject = {};

		entries.forEach(entry => {
			const [key, value] = entry.split('=');
			entriesObject[key] = value;
		});

		return entriesObject;
	}

	appendConfigEntry(key, value) {
		if (!fs.existsSync(FNPMRCPATH)) fs.writeFileSync(FNPMRCPATH, ''); 
		fs.appendFileSync(FNPMRCPATH, `${key}=${value}\n`);
	}

	deleteConfigEntry(keyToDelete) {
		const fileData = fs.readFileSync(FNPMRCPATH, 'utf-8');

		const newFileData = fileData.split('\n').filter(entry => entry).filter(entry => {
			const key = entry.split('=')[0];
			return key !== keyToDelete;
		}).join('\n');

		fs.writeFileSync(FNPMRCPATH, newFileData);
	}
}

