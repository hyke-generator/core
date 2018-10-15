import chalk from 'chalk'
// @ts-ignore
import chalkAnimation from 'chalk-animation'
import { BaseGenerator, execute } from '@hyke/sdk'
import * as path from 'path'
import * as fs from 'fs'

const { exec } = require('child_process')

interface IArgs {
  appName: string
  verbose: boolean
}

export function readFile(path: fs.PathLike): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    if (!fs.existsSync(path)) {
      reject(new Error('File does not exist'))
    }
    fs.readFile(path, 'utf8', (err, data: string) => {
      if (err) {
        reject(new Error(`Couldn't read file ${path}`))
      } else {
        resolve(data)
      }
    })
  })
}

export default class NewApplicationGenerator extends BaseGenerator<IArgs> {
  public generate(args: IArgs): void {
    chalkAnimation.rainbow('Generating React Native application. Please wait...')
    execute('react-native', ['init', args.appName, '--template', 'hike'], {}, args.verbose)
      // execute("pwd")
      .then(() => {
        return execute('node', [`${args.appName}/setup.js`], {}, args.verbose)
      })
      .then(() => {
        return execute('rm', [`-rf`, 'node_modules'])
      })
      .then(() => {
        return new Promise((resolve, reject) => {
          const sourcePath = path.join(process.cwd(), args.appName, '*')
          const destPath = process.cwd()

          exec(`mv ${sourcePath} ${destPath}`, (err: Error, stdout: string, stderr: string) => {
            if (err) {
              reject(err)
              return
            }
            resolve()
          })
        })
      })
      .then(() => {
        return execute('rm', [`-rf`, args.appName])
      })
      .then(() => {
        return readFile('hike.json')
      })
      .then(text => {
        return JSON.parse(text)
      })
      .then(hikeConfig => {
        return Promise.all(
          hikeConfig.generators.map((generator: string) => {
            return execute('yarn', ['add', generator, '--dev'])
          })
        )
      })
      .then(() => {
        return console.log(chalk.green('Application successfully generated.'))
      })
      .catch(() => {
        console.log(chalk.red('Error while generating React Native application.'))
      })
  }
}
