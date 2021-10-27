import { OrderEntriesSource } from '@spartacus/storefront';

/**
 * Indicates from which source the new saved cart name
 * should be taken.
 */
export enum CartNameSource {
  FILE_NAME = 'fileName',
  DATE_TIME = 'dateTime',
}
/**
 *  If `source` is set as `DATE_TIME`, it means that by default
 *  new saved cart name will be set as current date according to `fromDateOptions` property.
 *
 * `prefix` - adds text before the import date.
 * `suffix` - adds text after the import date.
 * `mask` - transforms current date according to specified format.
 */
export interface CartNameGeneration {
  source?: CartNameSource;
  fromDateOptions?: {
    prefix?: string;
    suffix?: string;
    mask?: string;
  };
}
/**
 * Allows to specify file validation attributes.
 *
 * `maxSize` - maximum imported file size in megabytes.
 * `maxEntries` - maximum number for imported entries per place specified as key from `OrderEntriesSource`.
 * `allowedTypes` - string array with types allowed to be imported.
 */
export interface FileValidity {
  maxSize?: number;
  maxEntries?: {
    [key in OrderEntriesSource]?: number;
  };
  allowedTypes?: string[];
}
/**
 * Interface for import config.
 */
export interface ImportConfig {
  fileValidity?: FileValidity;
  cartNameGeneration?: CartNameGeneration;
}
