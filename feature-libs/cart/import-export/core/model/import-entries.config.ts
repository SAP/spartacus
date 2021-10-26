import { OrderEntriesSource } from '@spartacus/storefront';

export enum CartNameSource {
  FILE_NAME = 'fileName',
  DATE_TIME = 'dateTime',
}

export interface CartNameGeneration {
  source?: CartNameSource;
  fromDateOptions?: {
    prefix?: string;
    suffix?: string;
    mask?: string;
  };
}

export interface FileValidity {
  // size unit is MB
  maxSize?: number;
  maxEntries?: {
    [key in OrderEntriesSource | string]?: number;
  };
  allowedTypes?: string[];
}

export interface ImportConfig {
  fileValidity?: FileValidity;
  cartNameGeneration?: CartNameGeneration;
}
