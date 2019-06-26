#!/usr/bin/env node

const program = require('commander')
const config = require('../package.json')

program
	.version(config.version, '-v, --version')
	.command('init [name]', '初始化脚手架')
	
program.parse(process.argv)