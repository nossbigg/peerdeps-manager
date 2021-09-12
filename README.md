## `.peerdeps-manager.config.js` schema

```javascript
const config = {
  // where you define your packages to install/uninstall during set/unset actions
  // format: same as per provided to npm install/uninstall or yarn add/remove to maximize compatibility
  set: { packages: ["lodash.uniq", "lodash.template@4.0.6"] },
  unset: { packages: ["lodash.uniq", "lodash.template"] },
};

module.exports = config;
```

_Related documentation:_

- [`npm install`](https://docs.npmjs.com/cli/v6/commands/npm-install)
- [`npm uninstall`](https://docs.npmjs.com/cli/v6/commands/npm-uninstall)
- [`yarn add`](https://yarnpkg.com/cli/add)
- [`yarn remove`](https://yarnpkg.com/cli/remove)

## Developing

- Make `peerdeps-manager` available to be locally symlinked:
  - (in `./peerdeps-manager`) `npm link`
- Use `peerdeps-manager` in a project:
  - (in other project directory) `npm install -D peerdeps-manager`
  - (in other project directory) `npm link peerdeps-manager`
