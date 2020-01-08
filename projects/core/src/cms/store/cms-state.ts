import { EntityState, LoaderState } from '../../state/index';
import { EntityLoaderState } from '../../state/utils/entity-loader/entity-loader-state';
import { NodeItem } from '../model/node-item.model';
import { Page } from '../model/page.model';

export const CMS_FEATURE = 'cms';
export const NAVIGATION_DETAIL_ENTITY = '[Cms] Navigation Entity';
// TODO:#4603 - mention in TODO for 2.0
export const COMPONENT_ENTITY = '[Cms[ Component Entity';

export interface StateWithCms {
  [CMS_FEATURE]: CmsState;
}

export type ComponentState = EntityLoaderState<any>;
export type ComponentsState = EntityState<ComponentsContext>;

export interface ComponentsContext {
  // TODO:#4603 - try to use `CmsComponent` type
  component: any;
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
  component: ComponentState;
  components: ComponentsState;
  // TODO:#4603 - investigate if this `navigation` could be moved inside of the `componentContext` slice. Investigate the reducer and effect
  navigation: EntityLoaderState<NodeItem>;
}
