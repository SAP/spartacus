// This file is required by karma.conf.js and loads recursively all the .spec and framework files

// Monkey-patches must be imported as the first:
import 'zone.js';
import 'zone.js/testing';
import 'projects/core/src/test-patch-object-define-property';
// Monkey-patches end

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp
  ): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context
  .keys()
  // filter tests from node_modules
  .filter((key) => !key.startsWith('@'))
  .forEach(context);
