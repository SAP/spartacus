import { CartTypes } from './import-export.model';

export type ProductData = {
  productCode: string;
  quantity: number;
};

export interface FileValidity {
  // size unit is MB
  maxSize?: number;
  maxEntries?: {
    [key in CartTypes]?: number;
  };
  allowedTypes?: string[];
}

export enum ProductImportStatus {
  SUCCESS = 'success',
  LOW_STOCK = 'lowStock',
  NO_STOCK = 'noStock',
  UNKNOWN_IDENTIFIER = 'unknownIdentifier',
  UNKNOWN_ERROR = 'unknownError',
  LIMIT_EXCEEDED = 'limitExceeded',
}

export interface ProductImportInfo {
  productCode: string;
  statusCode: ProductImportStatus;
  productName?: string;
  quantity?: number;
  quantityAdded?: number;
}

export interface ProductImportSummary {
  loading: boolean;
  cartName: string | undefined;
  count: number;
  total: number;
  successesCount: number;
  warningMessages: ProductImportInfo[];
  errorMessages: ProductImportInfo[];
}

export enum NameSource {
  FILE_NAME = 'fileName',
  DATE_TIME = 'dateTime',
}

export interface CartNameGeneration {
  source?: NameSource;
  fromDateOptions?: {
    prefix?: string;
    suffix?: string;
    mask?: string;
  };
}

export interface ImportConfig {
  fileValidity?: FileValidity;
  cartNameGeneration?: CartNameGeneration;
}
