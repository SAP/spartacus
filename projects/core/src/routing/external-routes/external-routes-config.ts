import { Injectable } from '@angular/core';
import { Config } from '../../config/config.module';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ExternalRoutesConfig {
  routing?: {
    internal?: string[];
  };
}
