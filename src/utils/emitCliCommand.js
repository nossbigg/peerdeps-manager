const { spawn } = require("child_process");

const makeDefaultOptions = () => {
  return {
    stdio: [process.stdin, process.stdout, process.stderr],
    shell: true,
  };
};

const emitCliCommand = (command, args, options) =>
  new Promise((resolve, reject) => {
    const mergedOptions = { ...makeDefaultOptions(), ...options };
    const thread = spawn(command, args, mergedOptions);

    thread.on("close", (code) => {
      if (code === 1) {
        reject(1);
      }
      resolve(0);
    });
  });

exports.emitCliCommand = emitCliCommand;
