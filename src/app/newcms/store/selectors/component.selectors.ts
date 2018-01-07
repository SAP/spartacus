import { createSelector } from "@ngrx/store";

import * as fromFeature from "../reducers";
import * as fromComponent from "../reducers/component.reducer";

export const getComponentState = createSelector(
  fromFeature.getCmsState,
  (state: fromFeature.CmsState) => state.component
);

export const getComponentEntities = createSelector(
  getComponentState,
  fromComponent.getComponentEntities
);

export const componentSelectorFactory = uid => {
  return createSelector(getComponentEntities, entities => {
    if (entities) {
      return entities[uid];
    }
  });
};
