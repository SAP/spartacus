import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class MultiDConfig {}

declare module '@spartacus/core' {
  interface Config extends MultiDConfig {}
}
