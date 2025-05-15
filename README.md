## Install the package via NPM

1. Install dependencies
2. Use Node version 16.20.0 or later.
3. Install the package `npm install kdg-react`

## Testing locally with `npm link`

1. Build and package the library package with `npm run pack`
2. Run `npm link` in the root folder
3. Inside your application, run `npm link kdg-react`
4. Rebuild the library with `npm run pack` after making any changes

## Testing and installing via .zip/.tgz

1. Package the library with `npm run pack`
2. An exported .tgz of the current version will be created at `./pkg` to be added to your project
3. Add this .tgz to your application and reference it in `package.json` via `file:/path-to-file.tgz`

## Contributing

1. Build at test your changes by following the testing steps above
2. Spin up the local storybook server with `npm run dev`
3. Update applicable component stories at `/src/stories`
4. Create a PR at [KDG-React](https://github.com/KDG-Development/KDG-React)

## Running with Docker

1. To start Storybook using Docker, run: `docker-compose up`
2. Access the Storybook interface at `http://localhost:6006`
3. Changes to your component files will automatically be reflected in the Storybook interface

### Additional Notes

- Internal onclick events should be wrapped with the `handleOnClick` function located at `/src/utils/Common` to ensure event bubbling and propagation is standardized (WrappedClickable `/src/components/Clickable` can be substituted when a mouse event is unavailable)

- You may need to include the CoreUI CSS in your application

`import '@coreui/coreui-pro/dist/css/coreui.min.css'`