import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromPage from '../reducers/page.reducer';

import { Page } from '../../models/page.model';
import { PageType } from '../../../routing/models/page-context.model';
import * as fromRouting from '../../../routing/store';

export const getPageState = createSelector(
  fromFeature.getCmsState,
  (state: fromFeature.CmsState) => state.page
);

export const getPageEntities = createSelector(
  getPageState,
  fromPage.getPageEntities
);

export const getLatestPageKey = createSelector(
  getPageState,
  fromPage.getLatestPageKey
);

export const getLatestPage = createSelector(
  getPageEntities,
  getLatestPageKey,
  (entities, key): Page => {
    return entities[key];
  }
);

export const currentSlotSelectorFactory = position => {
  return createSelector(getLatestPage, entity => {
    if (entity) {
      return entity.slots[position];
    }
  });
};
