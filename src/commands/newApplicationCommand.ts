import { Arguments, Argv, CommandModule } from "yargs";
import NewApplicationGenerator from "../new/NewApplicationGenerator";

const newApplicationGenerator = new NewApplicationGenerator();

const newApplicationCommand = {
    command: "new <AppName>",
    aliases: ["n"],
    describe: "Generate new application",
    builder: (yargs: Argv) => {
        return yargs
            .positional("AppName", {
                describe: "Application name",
                type: "string",
            })
            .option("verbose", {
                describe: "Verbose output to console",
                type: "boolean",
            });
    },
    handler: (args: Arguments) => {
        newApplicationGenerator.generate({
            appName: args.AppName,
            verbose: args.verbose,
        });
    },
} as CommandModule;

export default newApplicationCommand;
