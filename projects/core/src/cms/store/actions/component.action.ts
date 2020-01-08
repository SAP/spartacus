import { CmsComponent } from '../../../model/cms.model';
import { PageContext } from '../../../routing/index';
import { StateEntityLoaderActions } from '../../../state/utils/index';
import { COMPONENT_ENTITY } from '../cms-state';

export const LOAD_CMS_COMPONENT = '[Cms] Load Component';
export const LOAD_CMS_COMPONENT_FAIL = '[Cms] Load Component Fail';
export const LOAD_CMS_COMPONENT_SUCCESS = '[Cms] Load Component Success';
export const CMS_GET_COMPONENET_FROM_PAGE = '[Cms] Get Component from Page';

// TODO:#4603 - write todos to move the pageContext into the `payload` property

// TODO:#4603 - test
export class LoadCmsComponent extends StateEntityLoaderActions.EntityLoadAction {
  readonly type = LOAD_CMS_COMPONENT;
  constructor(public payload: string, public pageContext?: PageContext) {
    super(COMPONENT_ENTITY, payload);
  }
}

// TODO:#4603 - test
export class LoadCmsComponentFail extends StateEntityLoaderActions.EntityFailAction {
  readonly type = LOAD_CMS_COMPONENT_FAIL;
  constructor(
    uid: string,
    public payload: any,
    public pageContext?: PageContext
  ) {
    super(COMPONENT_ENTITY, uid, payload);
  }
}

// TODO:#4603 - test
export class LoadCmsComponentSuccess<
  T extends CmsComponent
> extends StateEntityLoaderActions.EntitySuccessAction {
  readonly type = LOAD_CMS_COMPONENT_SUCCESS;
  constructor(
    public payload: T,
    uid?: string,
    public pageContext?: PageContext
  ) {
    super(COMPONENT_ENTITY, uid || payload.uid || '');
  }
}

// TODO:#4603 - test
export class CmsGetComponentFromPage<
  T extends CmsComponent
> extends StateEntityLoaderActions.EntitySuccessAction {
  readonly type = CMS_GET_COMPONENET_FROM_PAGE;
  constructor(public payload: T[], public pageContext?: PageContext) {
    super(COMPONENT_ENTITY, payload.map(cmp => cmp.uid));
  }
}

// action types
export type CmsComponentAction<T extends CmsComponent> =
  | LoadCmsComponent
  | LoadCmsComponentFail
  | LoadCmsComponentSuccess<T>
  | CmsGetComponentFromPage<T>;
