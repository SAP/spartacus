export interface Attribute {
  stdAttrCode?: number;
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  incomplete?: boolean;
  displayAs?: number;
  dataType?: string;
  quantity?: number;
  values?: Value[];
  selectedSingleValue?: string;
  userInput?: string;
  isLineItem?: boolean;
}
export interface Value {
  name: string;
}
export interface Configuration {
  consistent?: boolean;
  complete?: boolean;
  productCode?: string;
  attributes?: Attribute[];
}
