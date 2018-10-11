import chalk from 'chalk'
// @ts-ignore
import chalkAnimation from 'chalk-animation'
import { BaseGenerator, execute } from '@hyke/sdk'
import mv from 'mv'

interface IArgs {
  appName: string
  verbose: boolean
}

export default class NewApplicationGenerator extends BaseGenerator<IArgs> {
  public generate(args: IArgs): void {
    chalkAnimation.rainbow('Generating React Native application. Please wait...')
    execute('react-native', ['init', args.appName, '--template', 'hike'], {}, args.verbose)
      .then(() => execute('node', [`${args.appName}/setup.js`], {}, args.verbose))
      .then(() => {
        mv(args.appName, '.', { mkdirp: true }, function(err) {
          // done. it first created all the necessary directories, and then
          // tried fs.rename, then falls back to using ncp to copy the dir
          // to dest and then rimraf to remove the source dir
        })
      })
      .then(() => console.log(chalk.green('Application successfully generated.')))
      .catch(() => {
        console.log(chalk.red('Error while generating React Native application.'))
      })
  }
}
