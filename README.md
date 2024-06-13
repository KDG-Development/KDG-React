## Install the package via NPM

Install dependencies

Use Node version 16.20.0 or later.

Install the package

`npm install kdg-react`

## Installing manually

Package the library

`npm run pack`

An exported .tar of the current version will be created at `./pkg` to be added to your project

## Contributing

1. Spin up the local storybook server

>`npm run dev`

2. Update applicable component stories at `/src/stories`

3. Create a PR at [KDG-React](https://github.com/KDG-Development/KDG-React)

### Additional Notes

- Internal onclick events should be wrapped with the `handleOnClick` function located at `/src/utils/Common` to ensure event bubbling and propagation is standardized (WrappedClickable `/src/components/Clickable` can be substituted when a mouse event is unavailable)
## Additional Notes

- You may need to include the CoreUI CSS in your application

`import '@coreui/coreui-pro/dist/css/coreui.min.css'`