const { makeFilePath } = require("../../utils");

const PEERDEPS_MANAGER_CONFIG_PATH = makeFilePath(
  process.cwd(),
  ".peerdeps-manager.config.js"
);

const loadPeerdepsManagerConfig = () => {
  try {
    const config = require(PEERDEPS_MANAGER_CONFIG_PATH);
    return config;
  } catch (e) {
    console.error(
      "cannot find .peerdeps-manager.config.js in project. quitting..."
    );
    process.exit(1);
  }
};

exports.loadPeerdepsManagerConfig = loadPeerdepsManagerConfig;
