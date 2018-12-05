import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromComponent from '../reducers/component.reducer';
import { ComponentState, CmsState } from '../cms-state';

export const getComponentState: MemoizedSelector<
  any,
  ComponentState
> = createSelector(
  fromFeature.getCmsState,
  (state: CmsState) => state.component
);

export const getComponentEntities: MemoizedSelector<
  any,
  { [id: string]: any }
> = createSelector(
  getComponentState,
  fromComponent.getComponentEntities
);

export const componentSelectorFactory = (uid): MemoizedSelector<any, any> => {
  return createSelector(
    getComponentEntities,
    entities => {
      if (Object.keys(entities).length !== 0) {
        return entities[uid];
      } else {
        return null;
      }
    }
  );
};
