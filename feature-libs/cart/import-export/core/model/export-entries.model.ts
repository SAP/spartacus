import { Translatable } from '@spartacus/core';

export interface ExportColumn {
  /**
   * `Translatable` object used to translate column heading to the language currently set in a storefront.
   * If `key` value was provided it also requires to have a representation in trasnlation file.
   */
  name: Translatable;

  /**
   * Dot notation string which refers to specified `OrderEntry` attribute.
   */
  value: string;
}

export interface FileOptions {
  /**
   * File name for exported file.
   */
  fileName: string;
  /**
   * Extension for exported file.
   */
  extension: string;
  /**
   * Mime/type for exported file.
   */
  type: string;
}

export interface ExportConfig {
  /**
   * Specifies which columns besides code and quantity can be exported to CSV file.
   */
  additionalColumns?: ExportColumn[];

  /**
   * Flag used to determine if message informing about download starting proccess
   * should be visible to user.
   */
  messageEnabled?: boolean;

  /**
   * Property dedicated to delay download starting process.
   */
  downloadDelay?: number;

  /**
   * Metadata for exported file.
   */
  fileOptions: FileOptions;
}

export enum ExportCartRoutes {
  SAVED_CART_DETAILS = 'savedCartsDetails',
  CART = 'cart',
}
