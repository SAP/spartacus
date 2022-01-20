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
 * Specifies cart name generation details.
 */
export interface CartNameGeneration {
  /**
   *  If `source` is set as `DATE_TIME`, it means that by default
   *  new saved cart name will be set as current date according to `fromDateOptions` property.
   */
  source?: CartNameSource;
  fromDateOptions?: {
    /**
     * Adds text before the import date.
     */
    prefix?: string;

    /**
     * Adds text after the import date.
     */
    suffix?: string;

    /**
     * Transforms current date according to specified format.
     */
    mask?: string;
  };
}

/**
 * Allows to specify file validation attributes.
 */
export interface FileValidity {
  /**
   * Maximum imported file size in megabytes.
   */
  maxSize?: number;

  /**
   * Maximum number for imported entries per place specified as key from `OrderEntriesSource`.
   */
  maxEntries?: {
    [key in OrderEntriesSource]?: number;
  };

  /**
   * String array with file types/extensions allowed for import.
   */
  allowedTypes?: string[];
}
/**
 * Interface for import config.
 */
export interface ImportConfig {
  fileValidity?: FileValidity;
  cartNameGeneration?: CartNameGeneration;
}
