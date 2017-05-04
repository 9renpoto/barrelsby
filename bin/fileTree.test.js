"use strict";
const chai_1 = require("chai");
const MockFs = require("mock-fs");
const TestUtilities = require("./test/utilities");
const FileTree = require("./fileTree");
describe("fileTree module has a", () => {
    describe("buildTree function that", () => {
        let result;
        let logged;
        beforeEach(() => {
            MockFs(TestUtilities.mockFsConfiguration());
            logged = [];
            const logger = (message) => logged.push(message);
            result = FileTree.buildTree("./directory1", {
                indexName: "barrel.ts",
                logger,
                rootPath: "some/path",
            });
        });
        afterEach(() => {
            MockFs.restore();
        });
        it("should build a tree structure matching the file system directories", () => {
            // Check the current directory.
            chai_1.assert.equal(result.path, "./directory1");
            chai_1.assert.equal(result.name, "directory1");
            // Check for a child.
            chai_1.assert.lengthOf(result.directories, 2);
            const subDirectory = result.directories[0];
            // Check the child directory.
            chai_1.assert.equal(subDirectory.path, "directory1/directory2");
            chai_1.assert.equal(subDirectory.name, "directory2");
        });
        it("should enumerate each file in a directory", () => {
            chai_1.assert.lengthOf(result.files, 3);
            const testFile = (name) => {
                const files = result.files.filter((file) => file.name === name);
                chai_1.assert.lengthOf(files, 1);
                const file = files[0];
                chai_1.assert.equal(file.path, `directory1/${name}`);
                chai_1.assert.equal(file.name, name);
            };
            testFile("index.ts");
            testFile("barrel.ts");
            testFile("ignore.txt");
        });
        it("should identify existing indexes in a directory", () => {
            chai_1.assert.isNotNull(result.index);
            const index = result.index;
            // Test the index.
            chai_1.assert.equal(index.name, "barrel.ts");
            chai_1.assert.equal(index.path, "directory1/barrel.ts");
            // Test it is in the files list.
            chai_1.assert.notEqual(result.files.indexOf(index), -1);
            // Check for a child.
            chai_1.assert.lengthOf(result.directories, 2);
            const subDirectory = result.directories[0];
            // Child shouldn't have an index.
            chai_1.assert.isUndefined(subDirectory.index);
        });
        it("should log useful information to the logger", () => {
            chai_1.assert.lengthOf(logged, 5);
            chai_1.assert.equal(logged[0], "Building directory tree for ./directory1");
            chai_1.assert.equal(logged[1], "Found existing index @ directory1/barrel.ts");
            chai_1.assert.equal(logged[2], "Building directory tree for directory1/directory2");
            chai_1.assert.equal(logged[3], "Building directory tree for directory1/directory2/directory4");
            chai_1.assert.equal(logged[4], "Building directory tree for directory1/directory3");
        });
    });
    describe("walkTree function that", () => {
        it("should should call the callback once for each directory in the tree", () => {
            const fakeTree = TestUtilities.mockDirectoryTree();
            // Build a collection all all directories.
            let allDirectories = [fakeTree];
            fakeTree.directories.forEach((directory) => {
                // Child/grandchild directories.
                allDirectories = allDirectories.concat([directory]).concat(directory.directories);
            });
            const calledDirectories = [];
            const callback = (directory) => calledDirectories.push(directory);
            FileTree.walkTree(fakeTree, callback);
            chai_1.assert.deepEqual(allDirectories, calledDirectories);
        });
    });
});
//# sourceMappingURL=fileTree.test.js.map