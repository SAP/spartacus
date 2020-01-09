import { createSelector, MemoizedSelector } from '@ngrx/store';
import { CmsComponent } from '../../../model/cms.model';
import {
  initialLoaderState,
  LoaderState,
  // StateEntityLoaderSelectors,
  StateEntitySelectors,
  StateLoaderSelectors,
} from '../../../state/utils/index';
// import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  // CmsState,
  ComponentsContext,
  ComponentsState,
  // ComponentState,
  StateWithCms,
} from '../cms-state';
import { getCmsState } from './feature.selectors';

// const getComponentEntitiesSelector = (state: ComponentState): any =>
//   Object.keys(state.entities).reduce((acc, cur) => {
//     acc[cur] = state.entities[cur].value;
//     return acc;
//   }, {});

// TODO:#4603 deprecation - delete and switch to `getComponentContextState()`
// export const getComponentState: MemoizedSelector<
//   StateWithCms,
//   ComponentState
// > = createSelector(
//   getCmsState,
//   (state: CmsState) => state.component
// );

// TODO:#4603 - test
export const getComponentsState: MemoizedSelector<
  StateWithCms,
  ComponentsState
> = createSelector(
  getCmsState,
  state => state.components
);

// export const getComponentEntities: MemoizedSelector<
//   StateWithCms,
//   { [id: string]: any }
// > = createSelector(
//   getComponentState,
//   getComponentEntitiesSelector
// );

// TODO:#4603 deprecation - delete and switch to `componentContextStateSelectorFactory()`
// export const componentStateSelectorFactory = (
//   uid: string
// ): MemoizedSelector<StateWithCms, LoaderState<any>> => {
//   return createSelector(
//     getComponentState,
//     entities => {
//       // the whole component entities are empty
//       if (Object.keys(entities.entities).length === 0) {
//         return undefined;
//       } else {
//         return StateEntityLoaderSelectors.entityStateSelector(entities, uid);
//       }
//     }
//   );
// };

// TODO:#4603 - test
export const componentsContextSelectorFactory = (
  uid: string
): MemoizedSelector<StateWithCms, ComponentsContext> => {
  return createSelector(
    getComponentsState,
    componentsState => {
      // the whole component componentsState are empty
      if (Object.keys(componentsState.entities).length === 0) {
        return undefined;
      } else {
        return StateEntitySelectors.entitySelector(componentsState, uid);
      }
    }
  );
};

// TODO:#4603 - test
export const componentsLoaderStateSelectorFactory = (
  uid: string,
  context: string
): MemoizedSelector<StateWithCms, LoaderState<boolean>> => {
  return createSelector(
    componentsContextSelectorFactory(uid),
    componentsContext => {
      if (!componentsContext) {
        return initialLoaderState;
      }

      const loaderState = componentsContext.pageContext[context];
      return loaderState ? loaderState : initialLoaderState;
    }
  );
};

// TODO:#4603 - test
export const componentsContextExistsSelectorFactory = (
  uid: string,
  context: string
): MemoizedSelector<StateWithCms, boolean> => {
  return createSelector(
    componentsContextSelectorFactory(uid),
    state => {
      if (!state) {
        return false;
      }

      const loaderState = state.pageContext[context];
      if (!loaderState) {
        return false;
      }

      const exists = StateLoaderSelectors.loaderValueSelector(loaderState);
      // TODO:#4603 - check
      // 'exists' variable can be undefined, in which case we want to return false
      return exists ? exists : false;
    }
  );
};

// TODO:#4603 deprecation - delete and switch to `componentContextSelectorFactory()`
// export const componentSelectorFactory = (
//   uid: string
// ): MemoizedSelector<StateWithCms, any> => {
//   return createSelector(
//     componentStateSelectorFactory(uid),
//     state => {
//       if (state) {
//         return StateLoaderSelectors.loaderValueSelector(state);
//       } else {
//         return undefined;
//       }
//     }
//   );
// };

// TODO:#4603 - test
export const componentSelectorFactory = (
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
