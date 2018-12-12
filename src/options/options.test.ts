import { assert } from "chai";

import * as Options from "./options";

describe("options module has a", () => {
  describe("getOptions function that", () => {
    let defaultOptions: any;
    beforeEach(() => {
      // Options that we are certain we will get from Yargs.
      // TODO: Enforce this using the type system - remove the anys.
      defaultOptions = {
        delete: false,
        directory: "test",
        location: "top",
        singleQuotes: false,
        structure: "flat",
        verbose: true
      };
    });
    it("should process the given configuration options", () => {
      const options = { ...defaultOptions, verbose: true };

      const processed = Options.getOptions(options);

      assert.match(processed.rootPath, /test$/);
    });
    it("should resolve the baseUrl if specified", () => {
      const options = { ...defaultOptions, baseUrl: "/base/url" };

      const processed = Options.getOptions(options);

      assert.match(processed.combinedBaseUrl as string, /base[\\/]url$/);
    });
  });
});
