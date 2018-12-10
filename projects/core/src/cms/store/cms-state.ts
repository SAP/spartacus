import { NodeItem } from '../model/node-item.model';
import { Page } from '../model/page.model';

export const CMS_FEATURE = 'cms';

export interface StateWithCms {
  [CMS_FEATURE]: CmsState;
}

export interface ComponentState {
  entities: { [id: string]: any };
}

export interface TestState {
  nodes: { [nodeId: string]: any };
}

export interface NavigationItemState {
  nodes: { [nodeId: string]: NodeItem };
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
