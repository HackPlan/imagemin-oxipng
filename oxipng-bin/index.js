'use strict';
const path = require('path');
const BinWrapper = require('bin-wrapper');

module.exports = new BinWrapper()
	.dest(path.resolve(__dirname, './vendor'))
	.use(process.platform === 'win32' ? 'oxipng.exe' : 'oxipng')
	.path();
