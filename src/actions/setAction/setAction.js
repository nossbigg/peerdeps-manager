const get = require("lodash.get");
const { loadPeerdepsManagerConfig } = require("../common");
const { execNpmInstall } = require("../packageManagerUtils");

const doSetAction = async () => {
  const pdmConfig = loadPeerdepsManagerConfig();

  const packageList = get(pdmConfig, "set.packages", []);
  const isEmptyPackageList = packageList.length === 0;
  if (isEmptyPackageList) {
    console.log("no packages defined in set.packages. nothing to do.");
    return;
  }

  await execNpmInstall(packageList);
};

exports.doSetAction = doSetAction;
