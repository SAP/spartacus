import { Action } from '@ngrx/store';

export interface LoaderMeta {
  entity: {
    type?: string;
    load?: boolean;
    error?: boolean;
  };
}

export interface LoaderAction extends Action {
  payload: any;
  meta: LoaderMeta;
}
