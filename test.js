const {promisify} = require('util');
const fs = require('fs');
const path = require('path');
const test = require('ava');
const getStream = require('get-stream');
const isPng = require('is-png');
const imageminOxipng = require('.');

const readFile = promisify(fs.readFile);

test('optimize a PNG', async t => {
	const buffer = await readFile(path.join(__dirname, 'fixture.png'));
	const data = await imageminOxipng()(buffer);
	t.true(data.length < buffer.length);
	t.true(isPng(data));
});

test('support oxipng options', async t => {
	const buffer = await readFile(path.join(__dirname, 'fixture.png'));
	const data = await imageminOxipng({
		quality: 1,
	})(buffer);
	t.true(data.length > 30000);
	t.true(isPng(data));
});

test('support streams', async t => {
	const buffer = await readFile(path.join(__dirname, 'fixture.png'));
	const stream = fs.createReadStream(path.join(__dirname, 'fixture.png'));
	const data = await getStream.buffer(imageminOxipng()(stream));
	t.true(data.length < buffer.length);
	t.true(isPng(data));
});

test('skip optimizing a non-PNG file', async t => {
	const buffer = await readFile(__filename);
	const data = await imageminOxipng()(buffer);
	t.is(data.length, buffer.length);
});
