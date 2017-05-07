"use strict";
const TestUtilities = require("../testUtilities");
const FileSystem = require("./fileSystem");
describe("builder/fileSystem module has a", () => {
    describe("buildFileSystemBarrel function that", () => {
        let output;
        beforeEach(() => {
            const rootDirectory = TestUtilities.mockDirectoryTree();
            const getModules = (directory) => directory.directories.reduce((previous, current) => {
                return previous.concat(getModules(current));
            }, directory.files);
            output = FileSystem.buildFileSystemBarrel(rootDirectory, getModules(rootDirectory));
        });
        it("should produce the correct output", () => {
            TestUtilities.assertMultiLine(output, `import * as barrelts from "./barrel";
import * as directory2directory4deeplyNestedts from "./directory2/directory4/deeplyNested";
import * as directory2scriptts from "./directory2/script";
import * as directory3programts from "./directory3/program";
import * as ignoretxt from "./ignore.txt";
import * as indexts from "./index";
export {barrelts as barrel};
export const directory2 = {
  directory4: {
    deeplyNested: directory2directory4deeplyNestedts,
  },
  script: directory2scriptts,
};
export const directory3 = {
  program: directory3programts,
};
export {ignoretxt as ignore.txt};
export {indexts as index};
`);
        });
        it("should produce output compatible with the recommended tslint ruleset", () => {
            TestUtilities.tslint(output);
        });
    });
});
//# sourceMappingURL=fileSystem.test.js.map