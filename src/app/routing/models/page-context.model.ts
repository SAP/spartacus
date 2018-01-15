export enum PageType {
  CONTENT_PAGE = 1,
  PRODUCT_PAGE = 2,
  CATEGORY_PAGE = 3,
  CATALOG_PAGE = 4
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
