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
  valueCode?: string;
  valueDisplay?: string;
  description?: string;
  selected?: boolean;
  quantity?: number;
  price?: number;
  productSystemId?: string;
  isCommerceProduct?: boolean;
}

export interface Configuration {
  consistent?: boolean;
  complete?: boolean;
  productCode?: string;
  attributes?: Attribute[];
}
