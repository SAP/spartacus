export enum PageType {
  CONTENT_PAGE = 'ContentPage',
  PRODUCT_PAGE = 'ProductPage',
  CATEGORY_PAGE = 'CategoryPage',
  CATALOG_PAGE = 'CatalogPage'
}

export class PageContext {
  id: string;
  type?: PageType;

  constructor(id: string, type?: PageType) {
    this.id = id;
    this.type = type;

    if (this.type == null) {
      this.type = PageType.CONTENT_PAGE;
    }
  }
}
