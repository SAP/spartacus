// This file is required by karma.conf.js and loads recursively all the .spec and framework files
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
