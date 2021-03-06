const upperCamelCase = require("uppercamelcase");
import { Arguments, Argv, CommandModule } from "yargs";
import buildTemplateGenerator from "../builders/TemplateGeneratorBuilder";
import { ITemplateGeneratorArgs, TemplateGenerator } from "@hyke/sdk";

interface IScreenGeneratorArgs extends ITemplateGeneratorArgs {
    screenName: string;
}

const screenGenerator: TemplateGenerator<IScreenGeneratorArgs> = buildTemplateGenerator<IScreenGeneratorArgs>({
    outputDirectory: "./src/screens",
    fileExtension: "tsx",
    templatePath: "core/templates/Screen.mustache",
});

const screenCommand = {
    command: "screen <ScreenName>",
    aliases: ["s"],
    describe: "Add new screen",
    builder: (yargs: Argv) => {
        return yargs.positional("ScreenName", {
            describe: "Screen name",
            type: "string",
        });
    },
    handler: (args: Arguments) => {
        screenGenerator.generate({
            fileName: `${upperCamelCase(args.ScreenName)}Screen`,
            screenName: upperCamelCase(args.ScreenName),
        });
    },
} as CommandModule;

export default screenCommand;
