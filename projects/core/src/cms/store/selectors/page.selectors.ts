import { createSelector, MemoizedSelector } from '@ngrx/store';

import { CmsState, PageState, StateWithCms } from '../cms-state';
import { ContentSlotData } from '../../model/content-slot-data.model';
import { Page } from '../../model/page.model';

import { getCmsState } from './feature.selectors';

export const getPageEntitiesSelector = (state: PageState) => state.entities;
export const getPageCount = (state: PageState) => state.count;
export const getLatestPageKeySelector = (state: PageState) =>
  state.latestPageKey;

export const getPageState: MemoizedSelector<
  StateWithCms,
  PageState
> = createSelector(
  getCmsState,
  (state: CmsState) => state.page
);

export const getPageEntities: MemoizedSelector<
  StateWithCms,
  { [context: string]: Page }
> = createSelector(
  getPageState,
  getPageEntitiesSelector
);

export const getLatestPageKey: MemoizedSelector<
  StateWithCms,
  string
> = createSelector(
  getPageState,
  getLatestPageKeySelector
);

export const getLatestPage: MemoizedSelector<
  StateWithCms,
  Page
> = createSelector(
  getPageEntities,
  getLatestPageKey,
  (entities, key): Page => {
    return entities[key];
  }
);

export const currentSlotSelectorFactory = (
  position: string
): MemoizedSelector<StateWithCms, ContentSlotData> => {
  return createSelector(
    getLatestPage,
    entity => {
      if (entity) {
        return entity.slots[position];
      }
    }
  );
};
