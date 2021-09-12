const { emitCliCommand } = require("../../utils");

const execNpmInstall = async (packages) => {
  await emitCliCommand("npm", ["install", ...packages]);
};

const execNpmUninstall = async (packages) => {
  await emitCliCommand("npm", ["uninstall", ...packages]);
};

exports.execNpmInstall = execNpmInstall;
exports.execNpmUninstall = execNpmUninstall;
