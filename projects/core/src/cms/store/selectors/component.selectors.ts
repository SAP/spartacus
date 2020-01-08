import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
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

// TODO:#4603 - carefully choose method names

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
export const getComponentContextState: MemoizedSelector<
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
export const componentContextStateSelectorFactory = (
  uid: string
): MemoizedSelector<StateWithCms, ComponentsContext> => {
  return createSelector(
    getComponentContextState,
    entities => {
      // the whole component entities are empty
      if (Object.keys(entities.entities).length === 0) {
        return undefined;
      } else {
        return StateEntitySelectors.entitySelector(entities, uid);
      }
    }
  );
};

// TODO:#4603 - test
export const componentContextExistsSelectorFactory = (
  uid: string,
  context: string
): MemoizedSelector<StateWithCms, boolean> => {
  return createSelector(
    componentContextStateSelectorFactory(uid),
    state => {
      if (state) {
        const componentContext = state.pageContext[context];
        return componentContext
          ? StateLoaderSelectors.loaderValueSelector(componentContext)
          : false;
      } else {
        return false;
      }
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
export const componentContextSelectorFactory = (
  uid: string,
  context: string
): MemoizedSelector<StateWithCms, ComponentsContext> => {
  return createSelector(
    componentContextStateSelectorFactory(uid),
    componentContextExistsSelectorFactory(uid, context),
    (state, exists) => {
      if (state && exists) {
        return state;
      } else {
        return undefined;
      }
    }
  );
};
