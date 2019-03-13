import { OccConfig } from '../../occ/config/occ-config';

export const defaultOccProductConfig: OccProductConfig = {
  occProduct: {
    getProduct:
      'products/${productCode}?fields=DEFAULT,averageRating,images(FULL),classifications,numberOfReviews',
    getProductReviews: 'products/${productCode}/reviews',
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
    getProduct?: string;
    getProductReviews?: string;
    productSearch?: string[];
    productSuggestions?: string[];

    baseUrl?: string;
    occPrefix?: string;
    baseSite?: string;
  };
}
