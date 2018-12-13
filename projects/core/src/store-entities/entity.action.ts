import { LoaderAction, LoaderMeta } from './loader.action';

export interface EntityMeta extends LoaderMeta {
  entity: {
    id: string;
    type?: string;
    load?: boolean;
    error?: boolean;
  };
}

export interface EntityAction extends LoaderAction {
  meta: EntityMeta;
}
