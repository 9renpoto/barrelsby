import path from "path";

export type LocationOption = "top" | "below" | "all" | "replace" | "branch";

export type StructureOption = "flat" | "filesystem";

// Options provided by yargs.
export interface Arguments {
  baseUrl?: string;
  config?: string;
  directory?: string;
  delete?: boolean;
  exclude?: string[];
  help?: boolean;
  include?: string[];
  location?: LocationOption;
  name?: string;
  singleQuotes?: boolean;
  structure?: StructureOption;
  version?: boolean;
  verbose?: boolean;
}

// Calculated options.
interface CalculatedOptions {
  rootPath: string;
  combinedBaseUrl?: string;
}

export type Options = Arguments & CalculatedOptions;

export function getOptions(options: any): Options {
  // TODO: A lot of these options would be better passed only to the places they are needed, rather than as one
  // huge blob.

  options.rootPath = path.resolve(options.directory);

  // Resolve base url.
  if (options.baseUrl) {
    options.combinedBaseUrl = path.join(options.rootPath, options.baseUrl);
  }

  return options;
}
