const isFileExists = (filePath) => {
  try {
    fs.statSync(filePath);
    return true;
  } catch {
    return false;
  }
};
