import { createSelector, MemoizedSelector } from '@ngrx/store';

import { CmsState, PageState, StateWithCms, IndexType } from '../cms-state';
import { PageContext } from '../../../routing';
import { EntityLoaderState, LoaderState } from '../../../state';
import { ContentSlotData } from '../../model/content-slot-data.model';
import { Page } from '../../model/page.model';

import { getCmsState } from './feature.selectors';
import { PageType } from '../../../occ/occ-models/occ.models';

export const getPageEntitiesSelector = (state: PageState) =>
  state.pageData.entities;
export const getLatestPageIdSelector = (state: PageState) => state.latestPageId;

export const getPageState: MemoizedSelector<
  StateWithCms,
  PageState
> = createSelector(
  getCmsState,
  (state: CmsState) => state.page
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
    (index: IndexType) => {
      // TODO:#1135 - move this logic somewhere out of the selector
      switch (pageContext.type) {
        case PageType.CONTENT_PAGE: {
          return index.content;
        }
        case PageType.PRODUCT_PAGE: {
          return index.product;
        }
        case PageType.CATEGORY_PAGE: {
          return index.category;
        }
        case PageType.CATALOG_PAGE: {
          return index.catalog;
        }
      }
      // TODO:#1135 what to return?
      return undefined;
    }
  );

// TODO:#1135 - test
export const getIndexEntity = (
  pageContext: PageContext
): MemoizedSelector<StateWithCms, LoaderState<string>> =>
  createSelector(
    getIndex(pageContext),
    index => index.entities[pageContext.id] || {}
  );

// TODO:#1135 - test
export const getPageDataByContext = (
  pageContext: PageContext
): MemoizedSelector<StateWithCms, Page> =>
  createSelector(
    getPageState,
    getIndexEntity(pageContext),
    (pageState: PageState, entity: LoaderState<string>) =>
      pageState.pageData[entity.value]
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

// TODO:#1135 - delete?
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
