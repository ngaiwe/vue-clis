#!/usr/bin/env node

const path = require('path')
const program = require('commander')
const config = require('../package.json')

program
	.version(config.version, '-V, --version')
	.command('init [name]', '初始化脚手架')

program.parse(process.argv)