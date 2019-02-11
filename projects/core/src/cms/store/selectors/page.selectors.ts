import { createSelector, MemoizedSelector } from '@ngrx/store';

import { CmsState, PageState, StateWithCms, IndexType } from '../cms-state';
import { EntityLoaderState } from '../../../state';
import { ContentSlotData } from '../../model/content-slot-data.model';
import { Page } from '../../model/page.model';

import { getCmsState } from './feature.selectors';

export const getPageEntitiesSelector = (state: PageState) =>
  state.pageData.entities;
export const getLatestPageKeySelector = (state: PageState) =>
  state.latestPageId;

// TODO:#1135 - update test
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
export const getLoaderContentState: MemoizedSelector<
  StateWithCms,
  EntityLoaderState<string>
> = createSelector(
  getPageStateIndex,
  index => index.content
);

// TODO:#1135 - test
export const getLoaderProductState: MemoizedSelector<
  StateWithCms,
  EntityLoaderState<string>
> = createSelector(
  getPageStateIndex,
  index => index.product
);

// TODO:#1135 - test
export const getLoaderCategoryState: MemoizedSelector<
  StateWithCms,
  EntityLoaderState<string>
> = createSelector(
  getPageStateIndex,
  index => index.category
);

// TODO:#1135 - test
export const getLoaderCatalogState: MemoizedSelector<
  StateWithCms,
  EntityLoaderState<string>
> = createSelector(
  getPageStateIndex,
  index => index.catalog
);

export const getPageEntities: MemoizedSelector<
  StateWithCms,
  { [context: string]: Page }
> = createSelector(
  getPageState,
  getPageEntitiesSelector
);

// TODO:#1135 - rename `key` to id.
export const getLatestPageKey: MemoizedSelector<
  StateWithCms,
  string
> = createSelector(
  getPageState,
  getLatestPageKeySelector
);

// TODO:#1135 - rename `key` to id.
export const getLatestPage: MemoizedSelector<
  StateWithCms,
  Page
> = createSelector(
  getPageEntities,
  getLatestPageKey,
  // TODO:#1135 - rename `key` to id.
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
