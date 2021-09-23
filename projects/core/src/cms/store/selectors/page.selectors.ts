import { createSelector, MemoizedSelector } from '@ngrx/store';
import { PageType } from '../../../model/cms.model';
import { PageContext } from '../../../routing';
import { StateUtils } from '../../../state/utils/index';
import { ContentSlotData } from '../../model/content-slot-data.model';
import { Page } from '../../model/page.model';
import { CmsState, IndexType, PageState, StateWithCms } from '../cms-state';
import { getCmsState } from './feature.selectors';

const getPageEntitiesSelector = (state: PageState) => state.pageData.entities;
const getIndexByType = (
  index: IndexType,
  type: PageType
): StateUtils.EntityLoaderState<string> => {
  switch (type) {
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
};

const getPageComponentTypesSelector: (page: Page) => string[] = (
  page: Page
) => {
  const componentTypes = new Set<string>();
  if (page && page.slots) {
    for (const slot of Object.keys(page.slots)) {
      for (const component of page.slots[slot].components || []) {
        componentTypes.add(component.flexType);
      }
    }
  }
  return Array.from(componentTypes);
};

export const getPageState: MemoizedSelector<StateWithCms, PageState> =
  createSelector(getCmsState, (state: CmsState) => state.page);

export const getPageStateIndex: MemoizedSelector<StateWithCms, IndexType> =
  createSelector(getPageState, (page: PageState) => page.index);

export const getPageStateIndexEntityLoaderState = (
  pageContext: PageContext
): MemoizedSelector<StateWithCms, StateUtils.EntityLoaderState<string>> =>
  createSelector(getPageStateIndex, (index: IndexType) =>
    getIndexByType(index, pageContext.type)
  );

export const getPageStateIndexLoaderState = (
  pageContext: PageContext
): MemoizedSelector<StateWithCms, StateUtils.LoaderState<string>> =>
  createSelector(
    getPageStateIndexEntityLoaderState(pageContext),
    (indexState) =>
      StateUtils.entityLoaderStateSelector(indexState, pageContext.id)
  );

export const getPageStateIndexValue = (
  pageContext: PageContext
): MemoizedSelector<StateWithCms, string> =>
  createSelector(getPageStateIndexLoaderState(pageContext), (entity) =>
    StateUtils.loaderValueSelector<string>(entity)
  );

export const getPageEntities: MemoizedSelector<
  StateWithCms,
  { [id: string]: Page }
> = createSelector(getPageState, getPageEntitiesSelector);

export const getPageData = (
  pageContext: PageContext
): MemoizedSelector<StateWithCms, Page> =>
  createSelector(
    getPageEntities,
    getPageStateIndexValue(pageContext),
    (entities: { [id: string]: Page }, indexValue: string) =>
      entities[indexValue]
  );

export const getPageComponentTypes = (
  pageContext: PageContext
): MemoizedSelector<StateWithCms, string[]> =>
  createSelector(getPageData(pageContext), (pageData) =>
    getPageComponentTypesSelector(pageData)
  );

export const getCurrentSlotSelectorFactory = (
  pageContext: PageContext,
  position: string
): MemoizedSelector<StateWithCms, ContentSlotData> => {
  return createSelector(getPageData(pageContext), (entity) => {
    if (entity) {
      return entity.slots[position] || { components: [] };
    }
  });
};
