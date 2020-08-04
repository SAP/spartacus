import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class CDCConfig {
  cdc?: {
    baseSite: string;
    javascriptUrl: string;
    sessionExpiration: number;
  }[];
}
