import { createSelector, MemoizedSelector } from '@ngrx/store';

import { CmsState, PageState, StateWithCms, IndexType } from '../cms-state';
import { PageContext } from '../../../routing';
import { EntityLoaderState } from '../../../state';
import { ContentSlotData } from '../../model/content-slot-data.model';
import { Page } from '../../model/page.model';

import { getCmsState } from './feature.selectors';

export const getPageEntitiesSelector = (state: PageState) =>
  state.pageData.entities;
export const getLatestPageIdSelector = (state: PageState) => state.latestPageId;

export const getPageState: MemoizedSelector<
  StateWithCms,
  PageState
> = createSelector(
  getCmsState,
  (state: CmsState) => state.newPage
);

// TODO:#1135 - test
export const getPageStateIndex: MemoizedSelector<
  StateWithCms,
  IndexType
> = createSelector(
  getPageState,
  (page: PageState) => page.index
);

// TODO:#1135 - test
export const getIndex = (
  pageContext: PageContext
): MemoizedSelector<StateWithCms, EntityLoaderState<string>> =>
  createSelector(
    getPageStateIndex,
    (index: IndexType) => index[pageContext.id]
  );

export const getPageEntities: MemoizedSelector<
  StateWithCms,
  { [id: string]: Page }
> = createSelector(
  getPageState,
  getPageEntitiesSelector
);

export const getLatestPageId: MemoizedSelector<
  StateWithCms,
  string
> = createSelector(
  getPageState,
  getLatestPageIdSelector
);

export const getLatestPage: MemoizedSelector<
  StateWithCms,
  Page
> = createSelector(
  getPageEntities,
  getLatestPageId,
  (entities, id): Page => {
    return entities[id];
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
