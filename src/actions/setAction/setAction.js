const { loadPeerdepsManagerConfig, loadPackageJson } = require("../common");

const doSetAction = () => {
  const pdmConfig = loadPeerdepsManagerConfig();
  const packageJson = loadPackageJson();
};

exports.doSetAction = doSetAction;
