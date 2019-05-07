import { UIProduct } from './product';

export interface UIProductReference {
  description?: string;
  preselected?: boolean;
  quantity?: number;
  referenceType?: string;
  target?: UIProduct;
}

export interface UIProductReferenceList {
  references?: UIProductReference[];
}
