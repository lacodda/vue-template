#!/usr/bin/env node
const serve = require(`webpack-serve`);
const config = require(`../webpack.config`);
const argv = {};

serve(argv, { config, clipboard: false });
