import { Provider } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import {
  mediaServerConfigFromMetaTagFactory,
  occServerConfigFromMetaTagFactory,
  provideConfigFactory,
} from '@spartacus/core';

export function provideConfigFromMetaTags(): Provider[] {
  return [
    provideConfigFactory(occServerConfigFromMetaTagFactory, [Meta]),
    provideConfigFactory(mediaServerConfigFromMetaTagFactory, [Meta]),
  ];
}
