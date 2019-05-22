export interface Component {
  modifiedtime?: Date;
  name?: string;
  otherProperties?: any;
  typeCode?: string;
  uid?: string;
}

export enum PageType {
  CONTENT_PAGE = 'ContentPage',
  PRODUCT_PAGE = 'ProductPage',
  CATEGORY_PAGE = 'CategoryPage',
  CATALOG_PAGE = 'CatalogPage',
}
