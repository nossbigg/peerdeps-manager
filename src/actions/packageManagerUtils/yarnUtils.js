const { emitCliCommand } = require("../../utils");

const execYarnAdd = async (packages) => {
  await emitCliCommand("yarn", ["add", ...packages]);
};

const execYarnRemove = async (packages) => {
  await emitCliCommand("yarn", ["remove", ...packages]);
};

exports.execYarnAdd = execYarnAdd;
exports.execYarnRemove = execYarnRemove;
