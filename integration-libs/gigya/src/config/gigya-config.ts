import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class GigyaConfig {
  gigya?: {
    baseSite: string;
    javascriptUrl: string;
    sessionExpiration: number;
  }[];
}
