export type ProductsData = {
  productCode: string;
  quantity: number;
}[];

export type InvalidFileInfo = {
  tooLarge?: boolean;
  invalidExtension?: boolean;
  empty?: boolean;
  notParsable?: boolean;
};

export type FileValidity = {
  // size unit is MB
  maxSize?: number;
  allowedExtensions?: string[];
  checkEmptyFile?: boolean;
};
