import { NodeItem } from '../model/node-item.model';
import { Page } from '../model/page.model';

export const CMS_FEATURE = 'cms';
export const COMPONENT_ENTITY = 'COMPONENT Entity';

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
  navigation: NavigationItemState;
}
