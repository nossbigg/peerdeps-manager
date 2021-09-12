const get = require("lodash.get");
const { loadPeerdepsManagerConfig } = require("../common");
const { execNpmUninstall } = require("../packageManagerUtils");

const doUnsetAction = async () => {
  const pdmConfig = loadPeerdepsManagerConfig();

  const packageList = get(pdmConfig, "unset.packages", []);
  const isEmptyPackageList = packageList.length === 0;
  if (isEmptyPackageList) {
    console.log("no packages defined in unset.packages. nothing to do.");
    return;
  }

  await execNpmUninstall(packageList);
};

exports.doUnsetAction = doUnsetAction;
