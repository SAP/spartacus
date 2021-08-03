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
  LOW_STOCK = 'lowStock',
  UNKNOWN_IDENTIFIER = 'unknownIdentifier',
  ERROR = 'unknownProblem',
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
  problemsCount: number;
  messages: ProductImportInfo[];
};

export interface CmsImportEntriesComponent extends CmsComponent {
  fileValidity: FileValidity;
}
