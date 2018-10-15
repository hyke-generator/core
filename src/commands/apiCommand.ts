const camelcase = require('camelcase')
const decamelize = require('decamelize')
const uppercamelcase = require('uppercamelcase')
import { Arguments, Argv, CommandModule } from 'yargs'
import buildTemplateGenerator from '../builders/TemplateGeneratorBuilder'
import { ITemplateGeneratorArgs, TemplateGenerator } from '@hyke/sdk'

interface IApiActionGeneratorArgs extends ITemplateGeneratorArgs {
  modelName: string
  modelNameCapital: string
}

interface IApiModelGeneratorArgs extends ITemplateGeneratorArgs {
  modelName: string
}

interface IApiReducerGeneratorArgs extends ITemplateGeneratorArgs {
  modelName: string
  modelNameLower: string
  modelNameCapital: string
}

interface IApiServiceGeneratorArgs extends ITemplateGeneratorArgs {
  modelName: string
}

const apiActionGenerator: TemplateGenerator<IApiActionGeneratorArgs> = buildTemplateGenerator<
  IApiActionGeneratorArgs
>({
  outputDirectory: './src/actions',
  fileExtension: 'ts',
  templatePath: 'core/templates/api/action.mustache'
})

const apiModelGenerator: TemplateGenerator<IApiModelGeneratorArgs> = buildTemplateGenerator<
  IApiModelGeneratorArgs
>({
  outputDirectory: './src/models',
  fileExtension: 'ts',
  templatePath: 'core/templates/api/model.mustache'
})

const apiReducerGenerator: TemplateGenerator<IApiReducerGeneratorArgs> = buildTemplateGenerator<
  IApiReducerGeneratorArgs
>({
  outputDirectory: './src/reducers',
  fileExtension: 'ts',
  templatePath: 'core/templates/api/reducer.mustache'
})

const apiServiceGenerator: TemplateGenerator<IApiServiceGeneratorArgs> = buildTemplateGenerator<
  IApiServiceGeneratorArgs
>({
  outputDirectory: './src/services',
  fileExtension: 'ts',
  templatePath: 'core/templates/api/service.mustache'
})

const apiCommand = {
  command: 'api  <ModelName>',
  aliases: ['ap'],
  describe: 'Add new api',
  builder: (yargs: Argv) => {
    return yargs.positional('ModelName', {
      describe: 'Model name',
      type: 'string'
    })
  },
  handler: (args: Arguments) => {
    const modelName = args.ModelName

    apiActionGenerator.generate({
      fileName: camelcase(modelName),
      modelName: uppercamelcase(modelName),
      modelNameCapital: decamelize(modelName)
    })

    apiModelGenerator.generate({
      fileName: camelcase(modelName),
      modelName: uppercamelcase(modelName)
    })

    apiReducerGenerator.generate({
      fileName: camelcase(modelName),
      modelName: uppercamelcase(modelName),
      modelNameCapital: decamelize(modelName),
      modelNameLower: camelcase(modelName)
    })

    apiServiceGenerator.generate({
      fileName: camelcase(modelName),
      modelName: uppercamelcase(modelName)
    })
  }
} as CommandModule

export default apiCommand
