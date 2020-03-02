import { createSelector, MemoizedSelector } from '@ngrx/store';
import { CmsComponent } from '../../../model/cms.model';
import {
  initialLoaderState,
  LoaderState,
  StateEntitySelectors,
  StateLoaderSelectors,
} from '../../../state/utils/index';
import { ComponentsContext, ComponentsState, StateWithCms } from '../cms-state';
import { getCmsState } from './feature.selectors';

export const getComponentsState: MemoizedSelector<
  StateWithCms,
  ComponentsState
> = createSelector(getCmsState, state => state.components);

export const componentsContextSelectorFactory = (
  uid: string
): MemoizedSelector<StateWithCms, ComponentsContext> => {
  return createSelector(getComponentsState, componentsState =>
    StateEntitySelectors.entitySelector(componentsState, uid)
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

export const componentsDataSelectorFactory = (
  uid: string
): MemoizedSelector<StateWithCms, CmsComponent> => {
  return createSelector(componentsContextSelectorFactory(uid), state =>
    state ? state.component : undefined
  );
};

export const componentsSelectorFactory = (
  uid: string,
  context: string
): MemoizedSelector<StateWithCms, CmsComponent> => {
  return createSelector(
    componentsDataSelectorFactory(uid),
    componentsContextExistsSelectorFactory(uid, context),
    (componentState, exists) => {
      if (componentState && exists) {
        return componentState;
      } else {
        return undefined;
      }
    }
  );
};
