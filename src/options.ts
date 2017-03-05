import * as Yargs from "yargs";

type LocationOption = "top" | "below" | "all" | "replace" | "branch";

type StructureOption = "flat" | "filesystem";

type Options = {
    config?: string;
    directory?: string;
    delete?: boolean;
    exclude?: string[];
    help?: boolean;
    include?: string[];
    location?: LocationOption;
    name?: string;
    structure?: StructureOption;
    version?: boolean;
    verbose?: boolean;
};

export const options: Options = Yargs
    .usage("Usage: barrelsby [options]")
    .example("barrelsby", "Run barrelsby")

    .config("c")
    .alias("c", "config")
    .describe("c", "The location of the config file.")

    .string("d")
    .alias("d", "directory")
    .nargs("d", 1)
    .describe("d", "The directory to create barrels for.")
    .default("d", "./")

    .boolean("D")
    .alias("D", "delete")
    .describe("D", "Delete existing index files.")
    .default("D", false)

    .array("e")
    .alias("e", "exclude")
    .describe("e", "Excludes any files whose paths match any of the regular expressions.")

    .help("h")
    .alias("h", "help")
    .default("h", false)

    .array("i")
    .alias("i", "include")
    .describe("i", "Only include files whose paths match any of the regular expressions.")

    .string("l")
    .alias("l", "location")
    .describe("l", "The mode for picking barrel file locations")
    .choices("l", ["top", "below", "all", "replace", "branch"])
    .default("l", "top")

    .string("n")
    .alias("n", "name")
    .describe("n", "The name to give barrel files")
    .default("n", "index")

    .string("s")
    .alias("s", "structure")
    .describe("s", "The mode for structuring barrel file exports")
    .choices("s", ["flat", "filesystem"])
    .default("s", "flat")

    .version()
    .alias("v", "version")
    .default("v", false)

    .boolean("V")
    .alias("V", "verbose")
    .describe("V", "Display additional logging information")
    .default("D", false)

    .argv;
