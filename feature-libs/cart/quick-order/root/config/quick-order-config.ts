import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class QuickOrderConfig {
  quickOrder?: {
    searchForm?: {
      displayProductImages: boolean;
      maxProducts: number;
      minCharactersBeforeRequest: number;
    };
  };
}

declare module '@spartacus/core' {
  interface Config extends QuickOrderConfig {}
}
