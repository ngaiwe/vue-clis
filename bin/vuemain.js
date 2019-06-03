#!/usr/bin/env node

const program = require('commander')
const config = require('../package.json')

program
	.version(config.version, '-V, --version')
	.usage('<command> [项目名称]')
	.command('init')
	.description('项目初始化')

program.parse(process.argv)
