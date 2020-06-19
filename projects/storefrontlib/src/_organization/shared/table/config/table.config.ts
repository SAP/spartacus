import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { TableStructure } from '../table.model';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class TableConfig {
  table: {
    [key: string]: TableStructure[];
  };
}
