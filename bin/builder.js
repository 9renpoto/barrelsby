"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const utilities_1 = require("./utilities");
const fileSystem_1 = require("./builders/fileSystem");
const flat_1 = require("./builders/flat");
const modules_1 = require("./modules");
/**
 * Builds the barrels for the specified directories.
 * @param destinations The directories that will contain the barrels.
 * @param options The options for building barrels.
 */
function buildBarrels(destinations, options) {
    // Determine which builder will be used.
    let builder;
    const resolvedStructure = options.structure || "flat";
    switch (resolvedStructure) {
        case "flat":
            builder = flat_1.buildFlatBarrel;
            break;
        case "filesystem":
            builder = fileSystem_1.buildFileSystemBarrel;
            break;
        default:
            builder = loadCustomBuilder(resolvedStructure, options);
            break;
    }
    // Build the barrels.
    destinations.forEach((destination) => buildBarrel(destination, builder, options));
}
exports.buildBarrels = buildBarrels;
// Build a barrel for the specified directory.
function buildBarrel(directory, builder, options) {
    options.logger(`Building barrel @ ${directory.path}`);
    // Determine the referenced modules and build the barrel content.
    const content = builder(directory, modules_1.loadDirectoryModules(directory, options), options);
    // Write the barrel to disk.
    const destination = path.join(directory.path, options.barrelName);
    fs.writeFileSync(destination, content);
    // Update the file tree model with the new barrel.
    if (!directory.files.some((file) => file.name === options.barrelName)) {
        const convertedPath = utilities_1.convertPathSeparator(destination);
        const barrel = {
            name: options.barrelName,
            path: convertedPath,
        };
        options.logger(`Updating model barrel @ ${convertedPath}`);
        directory.files.push(barrel);
        directory.barrel = barrel;
    }
}
/** Builds the import path from the current directory (or baseUrl) to the target location. */
function buildImportPath(directory, target, options) {
    const usingBaseUrl = !!options.combinedBaseUrl;
    // If the base URL option is set then imports should be relative to there.
    const startLocation = usingBaseUrl ? options.combinedBaseUrl : directory.path;
    const relativePath = path.relative(startLocation, target.path);
    // Get the route.
    let directoryPath = path.dirname(relativePath);
    // If it's relative we might need to perpend "this" directory.
    if (!usingBaseUrl && directoryPath !== ".") {
        directoryPath = `.${path.sep}${directoryPath}`;
    }
    // Strip off the .ts or .tsx from the file name.
    const fileName = getBasename(relativePath);
    // Build the final path string. Use posix-style seperators.
    const location = `${directoryPath}${path.sep}${fileName}`;
    return utilities_1.convertPathSeparator(location);
}
exports.buildImportPath = buildImportPath;
/** Strips the .ts or .tsx file extension from a path and returns the base filename. */
function getBasename(relativePath) {
    const strippedTsPath = path.basename(relativePath, ".ts");
    const strippedTsxPath = path.basename(relativePath, ".tsx");
    // Return whichever path is shorter. If they're the same length then nothing was stripped.
    return strippedTsPath.length < strippedTsxPath.length ? strippedTsPath : strippedTsxPath;
}
exports.getBasename = getBasename;
function loadCustomBuilder(location, options) {
    let builder;
    options.logger(`Loading custom builder from ${location}`);
    builder = require(fs.realpathSync(location));
    const logger = (message) => options.logger(`Loading Builder: ${message}`);
    if (typeof (builder) !== "function") {
        throw new Error("Custom builder is not a function");
    }
    switch (builder.length) {
        case 0:
        case 1:
        case 2:
        default:
    }
    logger(builder.length.toString());
    return builder;
}
//# sourceMappingURL=builder.js.map