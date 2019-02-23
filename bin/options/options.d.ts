export declare type LocationOption = "top" | "below" | "all" | "replace" | "branch";
export declare type StructureOption = "flat" | "filesystem";
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
    noSemicolon?: boolean;
    singleQuotes?: boolean;
    structure?: StructureOption;
    version?: boolean;
    verbose?: boolean;
}
