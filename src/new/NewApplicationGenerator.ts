import chalk from 'chalk'
// @ts-ignore
import chalkAnimation from 'chalk-animation'
import { BaseGenerator, execute } from '@hyke/sdk'

interface IArgs {
  appName: string
  verbose: boolean
}

export default class NewApplicationGenerator extends BaseGenerator<IArgs> {
  public generate(args: IArgs): void {
    chalkAnimation.rainbow('Generating React Native application. Please wait...')
    execute('node', ['react-native', 'init', args.appName, '--template', 'hike'], {}, args.verbose)
      .then(() => execute('node', [`${args.appName}/setup.js`], {}, args.verbose))
      .then(() => console.log(chalk.green('Application successfully generated.')))
      .catch(() => {
        console.log(chalk.red('Error while generating React Native application.'))
      })
  }
}
