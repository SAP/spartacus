import { CmsComponent } from '../../../model/cms.model';
import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import { COMPONENT_ENTITY } from '../cms-state';

export const LOAD_CMS_COMPONENT = '[Cms] Load Component';
export const LOAD_CMS_COMPONENT_FAIL = '[Cms] Load Component Fail';
export const LOAD_CMS_COMPONENT_SUCCESS = '[Cms] Load Component Success';
export const CMS_GET_COMPONENET_FROM_PAGE = '[Cms] Get Component from Page';

export class LoadCmsComponent extends EntityLoadAction {
  readonly type = LOAD_CMS_COMPONENT;
  constructor(public payload: string) {
    super(COMPONENT_ENTITY, payload);
  }
}

export class LoadCmsComponentFail extends EntityFailAction {
  readonly type = LOAD_CMS_COMPONENT_FAIL;
  constructor(uid: string, public payload: any) {
    super(COMPONENT_ENTITY, uid, payload);
  }
}

export class LoadCmsComponentSuccess<
  T extends CmsComponent
> extends EntitySuccessAction {
  readonly type = LOAD_CMS_COMPONENT_SUCCESS;
  constructor(public payload: T, uid?: string) {
    super(COMPONENT_ENTITY, uid || payload.uid || '');
  }
}

export class CmsGetComponentFromPage<
  T extends CmsComponent
> extends EntitySuccessAction {
  readonly type = CMS_GET_COMPONENET_FROM_PAGE;
  constructor(public payload: T[]) {
    super(COMPONENT_ENTITY, payload.map(cmp => cmp.uid));
  }
}

// action types
export type CmsComponentAction<T extends CmsComponent> =
  | LoadCmsComponent
  | LoadCmsComponentFail
  | LoadCmsComponentSuccess<T>
  | CmsGetComponentFromPage<T>;
