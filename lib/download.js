const download = require('download-git-repo')
const ora = require('ora')
const path = require('path')

module.exports = function (target) {
  target = path.join(target || 'webpack4x')
  return new Promise((resolve, reject) => {
    const url = 'gitlab.com:weiran/fx-cli#master'
    const spinner = ora(`正在下载,源地址:${url}`)
    spinner.start()
    download(url,
      target, {
        clone: true
      }, (err) => {
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