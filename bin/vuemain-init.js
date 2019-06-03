#!/usr/bin/env node

const program = require('commander')
const path = require('path')
const fs = require('fs')
const glob = require('glob')
const chalk = require('chalk')
const logSymbols = require('log-symbols')
const download = require('../lib/download.js')
const inquirer = require('../lib/inquirer.js')
const generator = require('../lib/generator.js')

program.usage('<project-name>').parse(process.argv)

let projectName = program.args[0]
let next = undefined

if (!projectName) {
  program.help()
  return false
}

const list = glob.sync('*')
let rootName = path.basename(process.cwd())

if (list.length) {
  let length = list.filter(name => {
    const fileName = path.resolve(process.cwd(), path.join('.', name))
    const isDir = fs.statSync(fileName).isDirectory()
    return name.indexOf(projectName) !== -1 && isDir
  }).length
  if (Boolean(length)) {
    console.log(`项目${projectName}已经存在`)
  } else {
    next = Promise.resolve(projectName)
  }
} else if (rootName === projectName) {
  next = inquirer.isEmpty().then(answer => {
    return Promise.resolve(answer.rootName ? '.' : projectName)
  })
} else {
  next = Promise.resolve(projectName)
}

next && go()

function go() {
  next.then(projectRoot => {
    if (projectRoot == '.') {
      void null
    } else {
      fs.mkdirSync(projectRoot)
    }
    return download(projectRoot).then(target => ({
      projectRoot,
      downloadTemp: target
    }))
  }).then(context => {
    return inquirer.init().then(answers => {
      return {
        ...context,
        metadata: {
          ...answers
        }
      }
    }).catch(err => {
      return Promise.reject(err)
    })
  }).then(context => {
    let {
      metadata,
      projectRoot,
      downloadTemp
    } = context
    return generator(metadata, projectRoot, downloadTemp)
  }).then(context => {
    console.log('......')
    console.log(logSymbols.success, chalk.green('创建成功:'))
    console.log(chalk.blue(`进入项目目录：cd ${context}`))
    console.log(chalk.blue(`安装依赖: yarn setup`))
    console.log(chalk.blue(`启动项目: yarn dev`))
  }).catch(err => {
    console.error(logSymbols.error, chalk.red(`创建失败：${err}`))
  })
}