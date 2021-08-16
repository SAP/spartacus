import { CmsComponent } from '@spartacus/core';

export type ProductsData = {
  productCode: string;
  quantity: number;
}[];

export type InvalidFileInfo = {
  tooLarge?: { maxSize: number };
  empty?: boolean;
  notParsable?: boolean;
};

export type FileValidity = {
  // size unit is MB
  maxSize?: number;
  allowedExtensions?: string[];
};

export enum ProductImportStatus {
  SUCCESS = 'success',
  LOW_STOCK = 'lowStock',
  NO_STOCK = 'noStock',
  UNKNOWN_IDENTIFIER = 'unknownIdentifier',
  UNKNOWN_ERROR = 'unknownError',
}

export type ProductImportInfo = {
  productCode: string;
  statusCode: ProductImportStatus;
  productName?: string;
  quantity?: number;
  quantityAdded?: number;
};

export type ProductImportSummary = {
  loading: boolean;
  cartName: string;
  count: number;
  total: number;
  successesCount: number;
  warningMessages: ProductImportInfo[];
  errorMessages: ProductImportInfo[];
};

export enum NameSource {
  FILE_NAME = 'fileName',
  DATE_TIME = 'dateTime',
}

export type CartOptions = {
  nameSource?: NameSource;
  nameFromDate?: {
    prefix: string;
    mask: string;
  };
};

export interface CmsImportEntriesComponent extends CmsComponent {
  fileValidity?: FileValidity;
  cartOptions?: CartOptions;
}
