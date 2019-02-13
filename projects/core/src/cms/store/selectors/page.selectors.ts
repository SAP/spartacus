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
      return { entities: {} };
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
export const getPageData = (
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

export const currentSlotSelectorFactory = (
  pageContext: PageContext,
  position: string
): MemoizedSelector<StateWithCms, ContentSlotData> => {
  return createSelector(
    getPageData(pageContext),
    entity => {
      if (entity) {
        return entity.slots[position];
      }
    }
  );
};
