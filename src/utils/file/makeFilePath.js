const path = require("path");

const makeFilePath = (...paths) => {
  return path.join(...paths);
};

exports.makeFilePath = makeFilePath;
