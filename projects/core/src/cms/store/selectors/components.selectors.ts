import { createSelector, MemoizedSelector } from '@ngrx/store';
import { CmsComponent } from '../../../model/cms.model';
import { StateUtils } from '../../../state/utils/index';
import { ComponentsContext, ComponentsState, StateWithCms } from '../cms-state';
import { getCmsState } from './feature.selectors';

export const getComponentsState: MemoizedSelector<
  StateWithCms,
  ComponentsState
> = createSelector(getCmsState, (state) => state.components);

export const componentsContextSelectorFactory = (
  uid: string
): MemoizedSelector<StateWithCms, ComponentsContext> => {
  return createSelector(getComponentsState, (componentsState) =>
    StateUtils.entitySelector(componentsState, uid)
  );
};

export const componentsLoaderStateSelectorFactory = (
  uid: string,
  context: string
): MemoizedSelector<StateWithCms, StateUtils.LoaderState<boolean>> => {
  return createSelector(
    componentsContextSelectorFactory(uid),
    (componentsContext) =>
      (componentsContext &&
        componentsContext.pageContext &&
        componentsContext.pageContext[context]) ||
      StateUtils.initialLoaderState
  );
};

/**
 * This selector will return:
 *   - true: component for this context exists
 *   - false: component for this context doesn't exist
 *   - undefined: if the exists status for component is unknown
 *
 * @param uid
 * @param context
 */
export const componentsContextExistsSelectorFactory = (
  uid: string,
  context: string
): MemoizedSelector<StateWithCms, boolean | undefined> => {
  return createSelector(
    componentsLoaderStateSelectorFactory(uid, context),
    (loaderState) => StateUtils.loaderValueSelector(loaderState)
  );
};

export const componentsDataSelectorFactory = (
  uid: string
): MemoizedSelector<StateWithCms, CmsComponent | undefined> => {
  return createSelector(componentsContextSelectorFactory(uid), (state) =>
    state ? state.component : undefined
  );
};

/**
 * This selector will return:
 *   - CmsComponent instance: if we have component data for specified context
 *   - null: if there is no component data for specified context
 *   - undefined: if status of component data for specified context is unknown
 *
 * @param uid
 * @param context
 */
export const componentsSelectorFactory = (
  uid: string,
  context: string
): MemoizedSelector<StateWithCms, CmsComponent | null | undefined> => {
  return createSelector(
    componentsDataSelectorFactory(uid),
    componentsContextExistsSelectorFactory(uid, context),
    (componentState, exists) => {
      switch (exists) {
        case true:
          return componentState;
        case false:
          return null;
        case undefined:
          return undefined;
      }
    }
  );
};
