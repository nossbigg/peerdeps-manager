const { doSetAction } = require("../actions/setAction");
const { doUnsetAction } = require("../actions/unsetAction");

const actionMapper = { set: doSetAction, unset: doUnsetAction };

const entrypoint = async () => {
  const [, , action] = process.argv;

  const handler = actionMapper[action];
  if (!handler) {
    console.error("unknown action, quitting...");
    process.exit(1);
  }

  await handler();
};

exports.entrypoint = entrypoint;
