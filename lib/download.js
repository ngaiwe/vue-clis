#!/usr/bin/env node

const download = require('download-git-repo')
const ora = require('ora')
const path = require('path')

const URL = {
  'none': 'github:ngaiwe/webpack4x#master'
}

module.exports = function (tenplate, target) {
  console.log(tenplate)
  target = path.join(target || 'webpack4x')
  return new Promise((resolve, reject) => {
    const url = URL[tenplate]
    const spinner = ora(`正在下载,源地址:${url}`)
    spinner.start()
    download(url,
      target, {
        clone: true
      }, (err) => {
        console.log(err)
        if (err) {
          spinner.fail()
          reject(err)
        } else {
          spinner.succeed()
          resolve(target)
        }
      })
  })
}