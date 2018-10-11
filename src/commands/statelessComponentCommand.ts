const upperCamelCase = require('uppercamelcase')
import { Arguments, Argv, CommandModule } from 'yargs'
import buildTemplateGenerator from '../builders/TemplateGeneratorBuilder'
import { TemplateGenerator, ITemplateGeneratorArgs } from '@hyke/sdk'

interface IComponentGeneratorArgs extends ITemplateGeneratorArgs {
  componentName: string
}

const componentGenerator: TemplateGenerator<IComponentGeneratorArgs> = buildTemplateGenerator<
  IComponentGeneratorArgs
>({
  outputDirectory: './src/components',
  fileExtension: 'tsx',
  templatePath: '@hyke/core/templates/StatelessComponent.mustache'
})

const statelessComponentCommand = {
  command: 'stateless <ComponentName>',
  aliases: ['sl'],
  describe: 'Add new stateless component',
  builder: (yargs: Argv) => {
    return yargs.positional('ComponentName', {
      describe: 'Component name',
      type: 'string'
    })
  },
  handler: (args: Arguments) => {
    componentGenerator.generate({
      fileName: upperCamelCase(args.ComponentName),
      componentName: upperCamelCase(args.ComponentName)
    })
  }
} as CommandModule

export default statelessComponentCommand
