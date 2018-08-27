import path from 'path';
import Vue from 'vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

// https://webpack.js.org/guides/dependency-management/#require-context
const requireWidgetComponent = require.context(
  // Look for files in the current directory
  './',
  // Look in subdirectories
  true,
  // Only include "Widget.vue" suffixed files
  /index.vue$/,
);

requireWidgetComponent.keys().forEach(fileName => {
  // Get the component config
  const componentConfig = requireWidgetComponent(fileName);
  // get component name founded on parent directory name
  let componentName = path.basename(path.dirname(fileName));
  // Get the PascalCase version of the component name
  componentName = upperFirst(camelCase(componentName));
  // Globally register the component
  Vue.component(componentName, componentConfig.default || componentConfig);
});
