#!/usr/bin/env node

const program = require('commander')

program
	.version('1.0.0')

program
	.usage('<command> [项目名称]')
	.command('init', '创建新项目')
	.description('项目初始化')

program.parse(process.argv)