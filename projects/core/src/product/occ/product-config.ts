import { OccConfig } from '../../occ/config/occ-config';

export const defaultOccProductConfig: OccProductConfig = {
  occProduct: {
    loadProduct: [
      'fields=DEFAULT',
      'averageRating',
      'images(FULL)',
      'classifications',
      'numberOfReviews'
    ],
    loadProductReviews: [],
    productSearch: [
      'fields=products(code,name,summary,price(FULL),images(DEFAULT),stock(FULL),averageRating)',
      'facets',
      'breadcrumbs',
      'pagination(DEFAULT)',
      'sorts(DEFAULT)'
    ],
    productSuggestions: []
  }
};

export abstract class OccProductConfig extends OccConfig {
  occProduct?: {
    loadProduct?: string[];
    loadProductReviews?: string[];
    productSearch?: string[];
    productSuggestions?: string[];
  };
}
