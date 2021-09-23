# peerdeps-manager

A simple CLI utility to install (and uninstall) your `node` peer dependencies to your dev dependencies.

## Why does this exist?

Because `npm` (`v4-6`) and `yarn` does not support installing peer depedencies (as of Sep 2021).

- [Related npm issue](https://github.blog/2021-02-02-npm-7-is-now-generally-available/), [Related yarn issue](https://github.com/yarnpkg/yarn/issues/1503)

_Note_: This tool is inspired by [`install-peerdeps`](https://github.com/nathanhleung/install-peerdeps) and does _roughly the same thing_, but with a declarative approach.

## Usage

- Install peerdeps-manager: `yarn add @nossbigg/peerdeps-manager -D` or `npm install @nossbigg/peerdeps-manager -D`
- Add `.peerdeps-manager.config.js` to define tool config
- Install dependencies defined in config: `peerdeps-manager set`
- Uninstall dependencies defined in config: `peerdeps-manager unset`
- Options to invoke `peerdeps-manager`:

  - Invoke via sequential command:

    ```bash
    peerdeps-manager set && jest

    // or

    peerdeps-manager unset && create-react-app start
    ```

  - Invoke via [pre/post command hooks](https://docs.npmjs.com/cli/v7/using-npm/scripts#pre--post-scripts):

    ```json
    // package.json
    {
      "scripts": {
        "pretest": "peerdeps-manager set",
        "test": "jest"
      }
    }
    ```

### .peerdeps-manager.config.js config file

`peerdeps-manager` requires a `.peerdeps-manager.config.js` config file from the root of the project for configuring the tool

Config file schema:

```javascript
// .peerdeps-manager.config.js
const config = {
  // where you define your packages to install/uninstall during set/unset actions
  // format: same as per provided to npm install/uninstall or yarn add/remove to maximize compatibility
  set: { packages: ["lodash.uniq", "lodash.template@4.0.6"] },
  unset: {
    packages: ["lodash.uniq", "lodash.template"],
    // automatically restores package.json to last git checked-in state, requires 'git' in CLI
    // set to 'false' to disable this feature
    doGitRestorePackageJson: true,
  },
};

module.exports = config;
```

**Note on** `unset.doGitRestorePackageJson`:

- [`npm uninstall`](https://docs.npmjs.com/cli/v7/commands/npm-uninstall)/[`yarn remove`](https://classic.yarnpkg.com/en/docs/cli/remove/) will remove a given package from all `dependencies` fields, including `peerDependencies`
- However, after an `unset`, a library package author would like to preserve `peerDependencies`, in order to indicate what peer dependencies a given library must have in order to work correctly
- Thus, for an ideal developer experience, during the `unset` step, `peerdeps-manager` will do a `git checkout package.json` **by default** in order to restore the `peerDependencies` that were lost due to uninstalling the temporary packages.
- You can disable this feature by setting `doGitRestorePackageJson: false` (eg. if you are experimenting with your `package.json` and you do not want to lose your changes)

_Related documentation:_

- [`npm install`](https://docs.npmjs.com/cli/v6/commands/npm-install), [`npm uninstall`](https://docs.npmjs.com/cli/v6/commands/npm-uninstall)
- [`yarn add`](https://yarnpkg.com/cli/add), [`yarn remove`](https://yarnpkg.com/cli/remove)

_Supported package managers:_

- `npm`
- `yarn`

## Use case

As a `react` component library maintainer, I would like to:

1. Specify `react` and `react-dom` in my `peerDependencies`
1. Uninstall `react` and `react-dom` in my `devDependencies` before running a webpack dev instance locally
   - to ensure that my React component is working as expected.
1. Install `react` and `react-dom` in my `devDependencies` before running my tests so that my test suite has the right dependencies to function and pass
   - eg. `enzyme` and `react-testing-library` requires the aforementioned dependencies to work correctly
1. Uninstall `react` and `react-dom` before publishing my package for it to work correctly

## Developing

1. Clone the repo
1. Install its dependencies: `npm i` or `yarn`
1. Make `peerdeps-manager` available to be locally symlinked:
   - (in `./peerdeps-manager`) `npm link`
1. Use `peerdeps-manager` in a project:
   - (in other project directory) `npm install -D @nossbigg/peerdeps-manager`
   - (in other project directory) `npm link @nossbigg/peerdeps-manager`
1. Publish package: `npm publish --access public`
