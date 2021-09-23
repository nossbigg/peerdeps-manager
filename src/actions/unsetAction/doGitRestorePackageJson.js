const { emitCliCommand } = require("../../utils/emitCliCommand");

const doGitRestorePackageJson = async () => {
  await emitCliCommand("git", ["checkout", "package.json"]);
};

exports.doGitRestorePackageJson = doGitRestorePackageJson;
