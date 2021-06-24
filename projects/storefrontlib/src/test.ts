// This file is required by karma.conf.js and loads recursively all the .spec and framework files

// Zone.js and zone.js/testing should be imported as FIRST and in this ORDER:
import 'zone.js';
import 'zone.js/testing';

// Patching Object.defineProperty unlocks frozen JS symbols and makes possible to mock them.
// Should be used with caution, and only if there is no other way to mock stuff (eg. by DI)
// Has to be imported just after zone.js imports.
import 'testing/patch-object-define-property';

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
