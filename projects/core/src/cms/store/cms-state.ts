import { EntityState } from '../../state';
import { NodeItem } from '../model/node-item.model';
import { Page } from '../model/page.model';
import { EntityLoaderState } from '../../state/utils/entity-loader/entity-loader-state';

export const CMS_FEATURE = 'cms';
export const NAVIGATION_DETAIL_ENTITY = '[Cms] Navigation Entity';
export const COMPONENT_ENTITY = '[Cms[ Component Entity';
export const PAGE_DATA_ENTITY = '[Cms] Page Data Entity';
export const CONTENT_PAGES_ENTITY = '[Cms] Content Pages Entity';
export const PRODUCT_PAGES_ENTITY = '[Cms] Product Pages Entity';
export const CATEGORY_PAGES_ENTITY = '[Cms] Category Pages Entity';
export const CATALOG_PAGES_ENTITY = '[Cms] Catalog Pages Entity';

export interface StateWithCms {
  [CMS_FEATURE]: CmsState;
}

export type ComponentState = EntityLoaderState<any>;

export type IndexType = {
  content: EntityLoaderState<string>;
  product: EntityLoaderState<string>;
  category: EntityLoaderState<string>;
  catalog: EntityLoaderState<string>;
};

export interface NavigationNodes {
  [nodeId: string]: NodeItem;
}

export interface PageState {
  pageData: EntityState<Page>;
  latestPageId: string; // TODO:#1135 - subject to be renamed
  index: IndexType;
}

export interface CmsState {
  page: PageState;
  // TODO:#1135 - rename to `page` and remove the `page` from the line above.
  newPage: PageState;
  component: ComponentState;
  navigation: EntityLoaderState<NodeItem>;
}
