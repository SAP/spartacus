export interface Component {
  modifiedtime?: Date;
  name?: string;
  otherProperties?: any;
  typeCode?: string;
  uid?: string;
}

export interface ContentSlot {
  // TODO: Optimize with converters
  components?: { component: Component[] };
  name?: string;
  position?: string;
  slotId?: string;
  slotShared?: boolean;
  slotStatus?: string;
}

export interface CMSPage {
  // TODO: Optimize with converters
  contentSlots?: { contentSlot: ContentSlot[] };
  defaultPage?: boolean;
  name?: string;
  template?: string;
  title?: string;
  typeCode?: string;
  uid?: string;
}

export enum PageType {
  CONTENT_PAGE = 'ContentPage',
  PRODUCT_PAGE = 'ProductPage',
  CATEGORY_PAGE = 'CategoryPage',
  CATALOG_PAGE = 'CatalogPage',
}
