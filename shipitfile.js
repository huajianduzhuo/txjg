'use strict'

module.exports = function (shipit) {
  require('shipit-deploy')(shipit)
  require('shipit-cnpm')(shipit)
  shipit.initConfig({
    default: {
      workspace: '/tmp/deploy/myj-project',
      deployTo: '/home/work/myj-project',
      repositoryUrl: 'https://github.com/huajianduzhuo/txjg.git',
      ignores: ['.git', 'node_modules', 'package-lock.json'],
      keepReleases: 2,
      deleteOnRollback: false,
      key: '/path/to/key',
      shallowClone: true,
      cnpm: {
        flags: '--production',
        local: false,
        npm: 'cnpm',
        remote: true
      },
      pm: {
        production: {
          path: '/home/work/myj-project/txjg/pm2/production.json'
        }
      }
    },
    production: {
      servers: ['root@101.200.45.254'],
      branch: 'txjg2'
    }
  })
}
