export const defaultProductConfig: ProductConfig = {
  product: {
    occFields: {
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
  }
};

export abstract class ProductConfig {
  product?: {
    occFields?: {
      loadProduct?: string[];
      loadProductReviews?: string[];
      productSearch?: string[];
      productSuggestions?: string[];
    };
  };
}
