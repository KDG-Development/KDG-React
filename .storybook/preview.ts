import type { Preview } from "@storybook/react";
import '@coreui/coreui-pro/dist/css/coreui.min.css'

const preview: Preview = {
  parameters: {
    actions: {
      // argTypesRegex: "^on[A-Z].*",
      disable: true,
    },
    docs: {
      canvas: {
        sourceState: 'shown'
      },
    },
    dependencies: {
      // display only dependencies/dependents that have a story in storybook
      // by default this is false
      withStoriesOnly: true,

      // completely hide a dependency/dependents block if it has no elements
      // by default this is false
      hideEmpty: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
