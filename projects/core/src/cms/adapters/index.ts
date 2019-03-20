import { Provider } from '@angular/core';
import { Adapter } from './adapter';
import { OccAdapter } from './occ.adapter';

export const adapters: Provider[] = [
  {
    provide: Adapter,
    useClass: OccAdapter,
    multi: true
  }
];

export * from './adapter';
