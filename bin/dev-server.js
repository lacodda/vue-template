#!/usr/bin/env node
const serve = require(`webpack-serve`);
const config = require(`../webpack.config`);

serve({ config, clipboard: false });
