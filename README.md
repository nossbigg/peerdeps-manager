## Developing

- Make `peerdeps-manager` available to be locally symlinked:
  - (in `./peerdeps-manager`) `npm link`
- Use `peerdeps-manager` in a project:
  - (in other project directory) `npm install -D peerdeps-manager` 
  - (in other project directory) `npm link peerdeps-manager`
