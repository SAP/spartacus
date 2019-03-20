import { OccConfig } from '../../occ/config/occ-config';

export const defaultOccProductConfig: OccConfig = {
  endpoints: {
    product:
      'products/${productCode}?fields=DEFAULT,averageRating,images(FULL),classifications,numberOfReviews',
    productReviews: 'products/${productCode}/reviews',
    // tslint:disable:max-line-length
    productSearch:
      'products/search?fields=products(code,name,summary,price(FULL),images(DEFAULT),stock(FULL),averageRating),facets,breadcrumbs,pagination(DEFAULT),sorts(DEFAULT)&query=${query}',
    // tslint:enable
    productSuggestions: 'products/suggestions?term=${term}&max=${max}'
  }
};
