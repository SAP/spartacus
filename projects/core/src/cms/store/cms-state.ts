import { NodeItem } from '../model/node-item.model';
import { Page } from '../model/page.model';
import { EntityLoaderState } from '../../state/utils/entity-loader/entity-loader-state';

export const CMS_FEATURE = 'cms';
export const NAVIGATION_DETAIL_ENTITY = '[Cms] Navigation Entity';

export interface StateWithCms {
  [CMS_FEATURE]: CmsState;
}

export interface ComponentState {
  entities: { [id: string]: any };
}

export interface NavigationNodes {
  [nodeId: string]: NodeItem;
}

export interface NavigationItemState {
  nodes: NavigationNodes;
}

export interface PageState {
  entities: { [context: string]: Page };
  count: number;
  latestPageKey: string;
}

export interface CmsState {
  page: PageState;
  component: ComponentState;
  navigation: EntityLoaderState<NodeItem>;
}
