export type ProductsData = {
  productCode: string;
  quantity: number;
}[];

export type InvalidFileInfo = {
  fileTooLarge?: boolean;
  invalidExtension?: boolean;
  fileEmpty?: boolean;
  notParsable?: boolean;
};

export type FileValidity = {
  // size unit is MB
  maxSize?: number;
  allowedExtensions?: string[];
  checkEmptyFile?: boolean;
};
