import Endpoints from './Endpoints.js';

export default class Registry {
	async doRequest(url, method = 'GET', fields, ...kargs) {
		let queryString = '';

		if (fields) {
			let iterations = 0;
			for (const key in fields) {
				iterations++;
				const value = fields[key];
				if (iterations === 1) queryString += `?${key}=${value}`;
				else queryString += `&${key}=${value}`;
			}
		}

		return fetch(`${url}${queryString}`, {
			method,
			...kargs
		});
	}

	async search(query) {
		const resp = await this.doRequest(Endpoints.Search, 'GET', {
			text: query
		});

		return await resp.json();
	}

	async packageInfo(name, version) {
		const resp = await this.doRequest(`${Endpoints.PackageInfo}/${name}/${version ? version : ''}`);

		return await resp.json();
	}
}

// console.log(await new Registry().search('webpack'));
// console.log(await new Registry().packageInfo('webpack'));
// console.log(await new Registry().packageInfo('webpack', '1.0.0'));

