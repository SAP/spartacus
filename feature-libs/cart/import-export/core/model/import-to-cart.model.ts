import { CmsComponent } from '@spartacus/core';

export type ProductsData = {
  productCode: string;
  quantity: number;
}[];

export type InvalidFileInfo = {
  tooLarge?: boolean;
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
  UNKNOWN_IDENTIFIER = 'unknownIdentifier',
  LOW_STOCK = 'lowStock',
}

export type ProductImportInfo = {
  productCode: string;
  statusCode: ProductImportStatus;
  productName?: string;
  quantity?: number;
  quantityAdded?: number;
};

export type ProductImportSummary = {
  cartName: string;
  loaded: number;
  count: number;
  successesCount: number;
  problemsCount: number;
  messages: ProductImportInfo[];
};

export interface CmsImportEntriesComponent extends CmsComponent {
  fileValidity: FileValidity;
}
