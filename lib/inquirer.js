#!/usr/bin/env node

var inquirer = require('inquirer')

const ERR_MESSAGE_STRING = '输入格式有误,请输入纯字母 例如 tutor'
const ERR_MESSAGE_NUMBER = '输入格式有误,请输入正确格式 例如 1.0.0'

const init = () => {
  return inquirer.prompt([{
    name: 'name',
    message: '项目名称',
    default: 'webpack'
  }, {
    name: 'version',
    message: '版本号',
    default: '1.0.0',
    validate: value => {
      let reg = /^\d+[.]\d+[.]\d+$/
      return reg.test(value)?true:ERR_MESSAGE_NUMBER
    }
  }, {
    name: 'description',
    message: '项目描述',
    default: 'webpack脚手架'
  }, {
    name: 'author',
    message: '作者',
    default: 'ngaiwe'
  }, {
    name: 'assetsPublicPath',
    message: '路由地址',
    default: 'fx',
    validate: value => {
      let reg = /^[a-zA-Z]+$/
      return reg.test(value)?true:ERR_MESSAGE_STRING
    }
  }])
}

const isEmpty = () => {
  return inquirer.prompt([{
    name: 'rootName',
    message: '当前目录和所创建目录相同，是否在当前目录创建脚手架？',
    type: 'confirm',
    default: true
  }])
}

const template = () => {
  return inquirer.prompt([{
    name: 'template',
    message: '选择模板',
    type: 'list',
    choices: [
      'none'
    ]
  }])
}
module.exports = {
  init,
  isEmpty,
  template
}