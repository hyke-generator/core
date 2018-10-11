const camelcase = require('camelcase')
const decamelize = require('decamelize')
const uppercamelcase = require('uppercamelcase')
import { Arguments, Argv, CommandModule } from 'yargs'
import buildTemplateGenerator from '../builders/TemplateGeneratorBuilder'
import { ITemplateGeneratorArgs, TemplateGenerator } from '@hyke/sdk'

interface IComponentGeneratorArgs extends ITemplateGeneratorArgs {
  actionNameUpperUnderscore: string
  actionNameUpperCamelCase: string
  actionNameLowerCamelCase: string
}

const actionGenerator: TemplateGenerator<IComponentGeneratorArgs> = buildTemplateGenerator<
  IComponentGeneratorArgs
>({
  outputDirectory: './src/actions',
  fileExtension: 'ts',
  templatePath: '@hyke/core/templates/action.mustache'
})

const actionCommand = {
  command: 'action  <ActionName>',
  aliases: ['a'],
  describe: 'Add new action',
  builder: (yargs: Argv) => {
    return yargs.positional('ActionName', {
      describe: 'Action name',
      type: 'string'
    })
  },
  handler: (args: Arguments) => {
    actionGenerator.generate({
      fileName: args.ActionName,
      actionNameLowerCamelCase: camelcase(args.ActionName),
      actionNameUpperCamelCase: uppercamelcase(args.ActionName),
      actionNameUpperUnderscore: decamelize(args.ActionName).toUpperCase()
    })
  }
} as CommandModule

export default actionCommand
