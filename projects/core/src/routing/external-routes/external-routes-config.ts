import { Injectable } from '@angular/core';
import { Config } from '../../config/config-injectors';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ExternalRoutesConfig {
  routing?: {
    internal?: string[];
  };
}
