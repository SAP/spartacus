import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from '../reducers/index';

import { Page } from '../../model/page.model';
import { PageState, CmsState } from '../cms-state';

export const getPageEntitiesSelector = (state: PageState) => state.entities;
export const getPageCount = (state: PageState) => state.count;
export const getLatestPageKeySelector = (state: PageState) =>
  state.latestPageKey;

export const getPageState: MemoizedSelector<any, PageState> = createSelector(
  fromFeature.getCmsState,
  (state: CmsState) => state.page
);

export const getPageEntities: MemoizedSelector<
  any,
  { [context: string]: Page }
> = createSelector(
  getPageState,
  getPageEntitiesSelector
);

export const getLatestPageKey: MemoizedSelector<any, string> = createSelector(
  getPageState,
  getLatestPageKeySelector
);

export const getLatestPage: MemoizedSelector<any, any> = createSelector(
  getPageEntities,
  getLatestPageKey,
  (entities, key): Page => {
    return entities[key];
  }
);

export const currentSlotSelectorFactory = (
  position
): MemoizedSelector<any, any> => {
  return createSelector(
    getLatestPage,
    entity => {
      if (entity) {
        return entity.slots[position];
      }
    }
  );
};
