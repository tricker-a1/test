# Prepearing

1. Download [nodejs](https://nodejs.org/en/download/) and follow the installer instructions.
Don't forget to choose right OS.
During the installer steps be sure it also installs `npm package manager(npm)`

2. After the install finished you can check out if everything was installed correct by run these commands in your machine terminal. If some of them does not output its version repeat the process or contact to experienced team members.
```
node -v
// Output - v *.*.*

npm -v
// Output - v *.*.*
```

# Project interaction

### `npm install`

Installs the packages that we have in `dependencies`/`devDepencencies` in `package.json` file.

We also have `package-lock.json` that is responsible on the exact project versions.

Removing this file will allow install the packages with up-to-date versions. (I don't recommend this)

Creates/updates `package-lock.json` and `node_modules` folder automatically.
`node_modules` is a high-weight folder with source code of the packages. Should be in `.gitignore`.

### `npm start`

Runs a dev server on http://localhost:3000 by default.
Has hot reloading oportunity.

### `npm run build`

Creates a production build that is used for deploying the project.
You can also run the production build on your local machine with `serve`


### `npm install --global serve`

Optional. This will install npm package `serve` globally. It means a project does not know about this package and won't affect on `node_modules`, `package.json` and `package-lock.json`.
After you created a production build you can run it with the next command on http://localhost:5000 by default.
```
// "build" is a folder you'd like to run
serve -s build
```
### `npm run eject`

This script ejects `react-scripts` library and outputs with a folder `config` you can edit.

`react-scripts` is internal react package that has its own default webpack and babel config.
Usually we do not need to run `eject`.

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).



