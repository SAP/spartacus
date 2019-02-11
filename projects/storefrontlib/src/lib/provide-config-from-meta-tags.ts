import { Provider } from '@angular/core';
import {
  provideConfigFactory,
  serverConfigFromMetaTagFactory
} from '@spartacus/core';
import { Meta } from '@angular/platform-browser';

export function provideConfigFromMetaTags(): Provider[] {
  return [provideConfigFactory(serverConfigFromMetaTagFactory, [Meta])];
}
