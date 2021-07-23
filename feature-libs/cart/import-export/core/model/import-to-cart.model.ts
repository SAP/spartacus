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

export interface CmsImportEntriesComponent extends CmsComponent {
  fileValidity: FileValidity;
}
