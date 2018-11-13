export enum PageType {
  CONTENT_PAGE = <any>'ContentPage',
  PRODUCT_PAGE = <any>'ProductPage',
  CATEGORY_PAGE = <any>'CategoryPage',
  CATALOG_PAGE = <any>'CatalogPage'
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
