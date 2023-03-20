## Install the package via NPM

Install dependencies

Use Node version 16.20.0 or later.

Install the package

`npm install kdg-react`

## Installing manually

Package the library

`npm run pack`

An exported .tar of the current version will be created at `./pkg` to be added to your project

## Testing changes in your application

Sometimes you might want to test changes in your specific application before releasing an updated version; In this case, use the following steps:

1. run `npm run pack`
2. copy the resulting .tgz to your application's directory
3. add the following section to your package.json, replacing the brackets and contained values:
  ```
  "optionalDependencies": {
    "[TESTING-PACKAGE-NAME]": "file:[PATH_TO_FILE].tgz"
  },
  ```
4. (optional) rename the .tgz in your app to remove the version number, e.g. 'kdg-react.tgz', as this will prevent the need for subsequent updates to `package.json` with new versions releases.
5. run `npm i [TESTING-PACKAGE-NAME] --force` to add the package to your node modules 
6. repeat this process for subsequent changes

## Contributing

Spin up the local storybook server

`npm run dev`

Update applicable component stories at `/src/stories`

### Additional Notes

Internal onclick events should be wrapped with the `handleOnClick` function located at `/src/utils/Common` to ensure event bubbling and propagation is standardized (WrappedClickable `/src/components/Clickable` can be substituted when a mouse event is unavailable)
## Additional Notes

You may need to include the CoreUI CSS in your application

`import '@coreui/coreui-pro/dist/css/coreui.min.css'`