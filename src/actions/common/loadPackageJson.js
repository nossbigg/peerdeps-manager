const { makeFilePath } = require("../../utils");

const PACKAGE_JSON_PATH = makeFilePath(process.cwd(), "package.json");

const loadPackageJson = () => {
  try {
    const config = require(PACKAGE_JSON_PATH);
    return config;
  } catch (e) {
    console.error("cannot find package.json in project. quitting...");
    process.exit(1);
  }
};

exports.loadPackageJson = loadPackageJson;
