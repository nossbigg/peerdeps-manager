const get = require("lodash.get");
const { loadPeerdepsManagerConfig } = require("../common");
const {
  execNpmInstall,
  execYarnAdd,
  getPackageManagerKey,
} = require("../packageManagerUtils");

const handlerMap = { npm: execNpmInstall, yarn: execYarnAdd };

const doSetAction = async () => {
  const pdmConfig = loadPeerdepsManagerConfig();

  const packageList = get(pdmConfig, "set.packages", []);
  const isEmptyPackageList = packageList.length === 0;
  if (isEmptyPackageList) {
    console.log("no packages defined in set.packages. nothing to do.");
    return;
  }

  const packageManagerKey = getPackageManagerKey();
  const installHandler = handlerMap[packageManagerKey];
  await installHandler(packageList);
};

exports.doSetAction = doSetAction;
