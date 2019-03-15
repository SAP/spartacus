import { Provider } from '@angular/core';
import { Populator } from './populator';
import { MergePageDataPopulator } from './merge-pagedata.populator';

export const populators: Provider[] = [
  {
    provide: Populator,
    useClass: MergePageDataPopulator,
    multi: true
  }
];

export * from './populator';
export * from './merge-pagedata.populator';
