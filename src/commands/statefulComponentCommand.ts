const upperCamelCase = require('uppercamelcase')
import { Arguments, Argv, CommandModule } from 'yargs'
import buildTemplateGenerator from '../builders/TemplateGeneratorBuilder'
import { ITemplateGeneratorArgs, TemplateGenerator } from '@hyke/sdk'

interface IComponentGeneratorArgs extends ITemplateGeneratorArgs {
  componentName: string
}

const statefulComponentGenerator: TemplateGenerator<
  IComponentGeneratorArgs
> = buildTemplateGenerator<IComponentGeneratorArgs>({
  outputDirectory: './src/components',
  fileExtension: 'tsx',
  templatePath: 'templates/StatefulComponent.mustache'
})

const statefulComponentCommand = {
  command: 'stateful <ComponentName>',
  aliases: ['sf'],
  describe: 'Add new stateful component',
  builder: (yargs: Argv) => {
    return yargs.positional('ComponentName', {
      describe: 'Component name',
      type: 'string'
    })
  },
  handler: (args: Arguments) => {
    statefulComponentGenerator.generate({
      fileName: upperCamelCase(args.ComponentName),
      componentName: upperCamelCase(args.ComponentName)
    })
  }
} as CommandModule

export default statefulComponentCommand
