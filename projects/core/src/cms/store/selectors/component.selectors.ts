import { createSelector, MemoizedSelector } from '@ngrx/store';
import { CmsComponent } from '../../../model/cms.model';
import {
  initialLoaderState,
  LoaderState,
  StateEntityLoaderSelectors,
  StateEntitySelectors,
  StateLoaderSelectors,
} from '../../../state/utils/index';
import {
  CmsState,
  ComponentsContext,
  ComponentsState,
  ComponentState,
  StateWithCms,
} from '../cms-state';
import { getCmsState } from './feature.selectors';

/**
 * @deprecated as of 2.0, this method will be removed.
 */
// TODO(issue:6027) - delete this method
const getComponentEntitiesSelector = (state: ComponentState): any =>
  Object.keys(state.entities).reduce((acc, cur) => {
    acc[cur] = state.entities[cur].value;
    return acc;
  }, {});

/**
 * @deprecated as of 2.0, this method will be removed in favour of `getComponentsState`
 */
// TODO(issue:6027) - delete this method
export const getComponentState: MemoizedSelector<
  StateWithCms,
  ComponentState
> = createSelector(
  getCmsState,
  (state: CmsState) => state.component
);

/**
 * @deprecated as of 2.0, this method will be removed.
 */
// TODO(issue:6027) - delete this method
export const getComponentEntities: MemoizedSelector<
  StateWithCms,
  { [id: string]: any }
> = createSelector(
  getComponentState,
  getComponentEntitiesSelector
);

/**
 * @deprecated as of 2.0, this method will be removed in favour of `componentsLoaderStateSelectorFactory`
 */
// TODO(issue:6027) - delete this method
export const componentStateSelectorFactory = (
  uid: string
): MemoizedSelector<StateWithCms, LoaderState<any>> => {
  return createSelector(
    getComponentState,
    entities => {
      // the whole component entities are empty
      if (Object.keys(entities.entities).length === 0) {
        return undefined;
      } else {
        return StateEntityLoaderSelectors.entityStateSelector(entities, uid);
      }
    }
  );
};

/**
 * @deprecated as of 2.0, this method will be removed in favour of `componentsSelectorFactory`
 */
// TODO(issue:6027) - delete this method
export const componentSelectorFactory = (
  uid: string
): MemoizedSelector<StateWithCms, any> => {
  return createSelector(
    componentStateSelectorFactory(uid),
    state => {
      if (state) {
        return StateLoaderSelectors.loaderValueSelector(state);
      } else {
        return undefined;
      }
    }
  );
};

export const getComponentsState: MemoizedSelector<
  StateWithCms,
  ComponentsState
> = createSelector(
  getCmsState,
  state => state.components
);

export const componentsContextSelectorFactory = (
  uid: string
): MemoizedSelector<StateWithCms, ComponentsContext> => {
  return createSelector(
    getComponentsState,
    componentsState => StateEntitySelectors.entitySelector(componentsState, uid)
  );
};

export const componentsLoaderStateSelectorFactory = (
  uid: string,
  context: string
): MemoizedSelector<StateWithCms, LoaderState<boolean>> => {
  return createSelector(
    componentsContextSelectorFactory(uid),
    componentsContext =>
      (componentsContext &&
        componentsContext.pageContext &&
        componentsContext.pageContext[context]) ||
      initialLoaderState
  );
};

export const componentsContextExistsSelectorFactory = (
  uid: string,
  context: string
): MemoizedSelector<StateWithCms, boolean> => {
  return createSelector(
    componentsLoaderStateSelectorFactory(uid, context),
    loaderState =>
      StateLoaderSelectors.loaderValueSelector(loaderState) || false
  );
};

export const componentsSelectorFactory = (
  uid: string,
  context: string
): MemoizedSelector<StateWithCms, CmsComponent> => {
  return createSelector(
    componentsContextSelectorFactory(uid),
    componentsContextExistsSelectorFactory(uid, context),
    (state, exists) => {
      if (state && exists) {
        return state.component;
      } else {
        return undefined;
      }
    }
  );
};
