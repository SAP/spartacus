import { Provider } from '@angular/core';
import { Populator } from './populator';
import { PageDataFallbackPopulator } from './fallback-pagedata.populator';

export const populators: Provider[] = [
  {
    provide: Populator,
    useClass: PageDataFallbackPopulator,
    multi: true
  }
];

export * from './occ-cms.converter';
export * from './populator';
export * from './fallback-pagedata.populator';
