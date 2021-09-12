const fs = require("fs");
const path = require("path");

const lockfileMap = {
  npm: "package-lock.json",
  yarn: "yarn.lock",
};

const getPackageManagerKey = () => {
  const lockfileMapKeys = Object.keys(lockfileMap);
  let packageManagerName;

  lockfileMapKeys.forEach((lockfileMapKey) => {
    const lockfilePath = path.join("./", lockfileMap[lockfileMapKey]);

    try {
      fs.statSync(lockfilePath);
      packageManagerName = lockfileMapKey;
    } catch {}
  });

  return packageManagerName;
};

exports.getPackageManagerKey = getPackageManagerKey;
