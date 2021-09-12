const { loadPackageJson } = require("../common");

const getDevDependenciesState = (packagesList) => {
  const packageJson = loadPackageJson();
  const { devDependencies } = packageJson;

  const presentPackages = packagesList.filter((key) => key in devDependencies);
  const missingPackages = packagesList.filter(
    (key) => !(key in devDependencies)
  );

  return { presentPackages, missingPackages };
};

exports.getDevDependenciesState = getDevDependenciesState;
