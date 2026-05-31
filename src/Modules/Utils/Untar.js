// extracts a gzip-compressed tar archive
import zlib from 'zlib'; // using the zlib library isn't skidding since it's built-in
import path from 'node:path'; // again, not skidding
import fs from 'fs'; // again, not skidding

export default class Untar {
	untar(tarData) {
		if (tarData.length === 1024) return;

		const header = new Uint8Array(tarData.slice(0, 512));
		const decoder = new TextDecoder();

		const fileName = decoder.decode(header.slice(0, 99));
		const absoluteFileName = path.resolve(fileName.slice(0, fileName.indexOf('\x00')));
		const fileSize = parseInt(decoder.decode(header.slice(124, 135)), 8);
		const typeFlag = header[156];
		const checksum = parseInt(decoder.decode(header.slice(148, 155)), 8);

		const paddingAmount = fileSize + ((512 - (fileSize % 512)) % 512);
		const fileData = new Uint8Array(tarData.slice(512, 512 + fileSize));

		const calculatedChecksum = header.fill(" ".charCodeAt(0), 148, 156).reduce((val, acc) => val + acc, 0);

		if (calculatedChecksum !== checksum) return; // make sure the specified checksum matches the actual checksum
		if (!absoluteFileName.startsWith(process.cwd())) return; // preventing directory traversal attacks

		fs.mkdirSync(path.dirname(absoluteFileName), { recursive: true });
		fs.writeFileSync(absoluteFileName, fileData);

		this.untar(tarData.slice(512 + paddingAmount));
	}

	extract(archive) {
		const fileData = fs.readFileSync(archive);
		const decompressedTarFile = zlib.gunzipSync(fileData); // "gun" zip? more like bomb zip
		this.untar(decompressedTarFile);
	}
}

//new Untar().extract('queueing-2.0.122.tgz');

