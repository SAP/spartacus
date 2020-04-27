import { CmsComponent } from '../../../model/cms.model';
import { PageContext } from '../../../routing/index';
import { StateUtils } from '../../../state/utils/index';
import { COMPONENT_ENTITY } from '../cms-state';

export const LOAD_CMS_COMPONENT = '[Cms] Load Component';
export const LOAD_CMS_COMPONENT_FAIL = '[Cms] Load Component Fail';
export const LOAD_CMS_COMPONENT_SUCCESS = '[Cms] Load Component Success';
export const CMS_GET_COMPONENT_FROM_PAGE = '[Cms] Get Component from Page';

export class LoadCmsComponent extends StateUtils.EntityLoadAction {
  readonly type = LOAD_CMS_COMPONENT;
  constructor(
    public payload: {
      uid: string;
      pageContext: PageContext;
    }
  ) {
    super(COMPONENT_ENTITY, payload.uid);
  }
}

export class LoadCmsComponentFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_CMS_COMPONENT_FAIL;
  constructor(
    public payload: { uid: string; error?: any; pageContext: PageContext }
  ) {
    super(COMPONENT_ENTITY, payload.uid, payload.error);
  }
}

export class LoadCmsComponentSuccess<
  T extends CmsComponent
> extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_CMS_COMPONENT_SUCCESS;
  constructor(
    public payload: {
      component: T;
      uid?: string;
      pageContext: PageContext;
    }
  ) {
    super(COMPONENT_ENTITY, payload.uid || payload.component.uid || '');
  }
}

export class CmsGetComponentFromPage<
  T extends CmsComponent
> extends StateUtils.EntitySuccessAction {
  readonly type = CMS_GET_COMPONENT_FROM_PAGE;
  constructor(
    public payload:
      | { component: T; pageContext: PageContext }
      | { component: T; pageContext: PageContext }[]
  ) {
    super(
      COMPONENT_ENTITY,
      [].concat(payload).map((cmp) => cmp.component.uid)
    );
  }
}

// action types
export type CmsComponentAction<T extends CmsComponent> =
  | LoadCmsComponent
  | LoadCmsComponentFail
  | LoadCmsComponentSuccess<T>
  | CmsGetComponentFromPage<T>;
