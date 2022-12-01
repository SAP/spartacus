import { StaticProvider } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

export function initTest(extraProviders?: StaticProvider[]): void {
  // First, initialize the Angular testing environment.
  getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(extraProviders),
    {
      teardown: { destroyAfterEach: false },
    }
  );
}
