import { Injectable } from '@angular/core';
import { Config } from '../../config/config.module';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ProductConfig {
  product?: {
    searchCriteria?: {
      pageSize?: number;
    };
  };
}
