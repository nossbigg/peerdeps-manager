const get = require("lodash.get");
const { loadPeerdepsManagerConfig } = require("../common");
const {
  execNpmUninstall,
  execYarnRemove,
  getPackageManagerKey,
} = require("../packageManagerUtils");
const { getDevDependenciesState } = require("./getDevDependenciesState");
const { doGitRestorePackageJson } = require("./doGitRestorePackageJson");

const handlerMap = { npm: execNpmUninstall, yarn: execYarnRemove };

const doUnsetAction = async () => {
  const pdmConfig = loadPeerdepsManagerConfig();

  const packageList = get(pdmConfig, "unset.packages", []);
  const isEmptyPackageList = packageList.length === 0;
  if (isEmptyPackageList) {
    console.log("no packages defined in unset.packages. nothing to do.");
    return;
  }

  const { presentPackages } = getDevDependenciesState(packageList);
  const isNoPackagesToUninstall = presentPackages.length === 0;
  if (isNoPackagesToUninstall) {
    console.log("no packages to uninstall. nothing to do.");
    return;
  }

  const packageManagerKey = getPackageManagerKey();
  const uninstallHandler = handlerMap[packageManagerKey];
  await uninstallHandler(presentPackages);

  const isDoGitRestorePackageJson = get(
    pdmConfig,
    "unset.doGitRestorePackageJson",
    true
  );
  if (isDoGitRestorePackageJson) {
    await doGitRestorePackageJson();
  }
};

exports.doUnsetAction = doUnsetAction;
