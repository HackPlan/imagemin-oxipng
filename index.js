'use strict';
const execa = require('execa');
const isPng = require('is-png');
const isStream = require('is-stream');
const oxipng = require('./oxipng-bin');
const ow = require('ow');

const imageminOxipng = (options = {}) => input => {
	const isBuffer = Buffer.isBuffer(input);

	if (!isBuffer && !isStream(input)) {
		return Promise.reject(new TypeError(`Expected a Buffer or Stream, got ${typeof input}`));
	}

	if (isBuffer && !isPng(input)) {
		return Promise.resolve(input);
	}

	const args = ['-'];

	if (typeof options.strip !== 'undefined') {
		ow(options.strip, ow.string);
		args.push('--strip', options.strip);
	}

	if (typeof options.quality !== 'undefined') {
		ow(options.quality, ow.number.integer.inRange(1, 6));
		args.push('-o', options.quality);
	}

	const subprocess = execa(oxipng, args, {
		encoding: null,
		maxBuffer: Infinity,
		input
	});

	const promise = subprocess
		.then(result => result.stdout) // eslint-disable-line promise/prefer-await-to-then
		.catch(error => {
			if (error.code === 99) {
				return input;
			}

			error.message = error.stderr || error.message;
			throw error;
		});

	subprocess.stdout.then = promise.then.bind(promise); // eslint-disable-line promise/prefer-await-to-then
	subprocess.stdout.catch = promise.catch.bind(promise);

	return subprocess.stdout;
};

module.exports = imageminOxipng;
module.exports.default = imageminOxipng;
