import { ITemplateGeneratorArgs, TemplateGenerator } from '@hyke/sdk'

export interface ITemplateGeneratorBuilderArguments {
  fileExtension: string
  outputDirectory: string
  templatePath: string
}

export default function buildTemplateGenerator<T extends ITemplateGeneratorArgs>(
  args: ITemplateGeneratorBuilderArguments
) {
  return new class Generator extends TemplateGenerator<T> {
    public getFileExtension(): string {
      return args.fileExtension
    }

    public getOutputDirectory(): string {
      return args.outputDirectory
    }

    public getTemplatePath(): string {
      return args.templatePath
    }
  }()
}
