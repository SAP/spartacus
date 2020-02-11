import { CmsComponent } from '../../model';
import { EntityState, LoaderState } from '../../state/index';
import { EntityLoaderState } from '../../state/utils/entity-loader/entity-loader-state';
import { NodeItem } from '../model/node-item.model';
import { Page } from '../model/page.model';

export const CMS_FEATURE = 'cms';
export const NAVIGATION_DETAIL_ENTITY = '[Cms] Navigation Entity';
export const COMPONENT_ENTITY = '[Cms] Component Entity';

export interface StateWithCms {
  [CMS_FEATURE]: CmsState;
}

export type ComponentsState = EntityState<ComponentsContext>;

export interface ComponentsContext {
  component: CmsComponent;
  /**
   * Page context stores an information for which context does the component exist.
   * For example, if `SiteLogoComponent` was successfully loaded for a product page with an ID of 1776948, then this object will contain:
   *
   * ```ts
   * ProductPage-1776948: {
   *  success: true,
   *  loading: false,
   *  error: false,
   *  // The `value` property indicates that the component exists for the given page context.
   *  value: true
   * }
   * ```
   *
   * If the same `SiteLogoComponent` component was tried to be loaded on homepage (page context id is `homepage`),
   * and it doesn't exist for some reason (maybe it has a restriction), then this object will contain:
   *
   * ```ts
   * ProductPage-1776948: {
   *  success: true,
   *  loading: false,
   *  error: false,
   *  // The `value` property indicates that the component exists for the given page context.
   *  value: true
   * },
   * ContentPage-homepage: {
   *  success: true,
   *  loading: false,
   *  error: false,
   *  // The `value` in this case is `false` indicating that the component was tried to be loaded, but it doesn't exist or has a restriction.
   *  value: false
   * }
   * ```
   *
   */
  pageContext: {
    [context: string]: LoaderState<boolean>;
  };
}

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
  index: IndexType;
}

export interface CmsState {
  page: PageState;
  components: ComponentsState;
  navigation: EntityLoaderState<NodeItem>;
}
