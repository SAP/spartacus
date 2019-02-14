import { PageState, IndexType } from '../cms-state';
import * as fromPageData from '../actions/page.action';

export const initialState: PageState = {
  pageData: undefined,
  index: {} as IndexType
};

// TODO:#1135 - delete file
export function reducer(
  state = initialState,
  action: fromPageData.PageAction
): PageState {
  switch (
    action.type
    // TODO:#1135 - delete
    // case fromPageData.UPDATE_LATEST_PAGE_KEY: {
    //   const pageKey = action.payload;
    //   console.log(`UPDATE_LATEST_PAGE_KEY`, pageKey);
    //   return {
    //     ...state,
    //     latestPageKey: pageKey
    //   };
    // }

    // TODO:#1135 - delete
    // case fromPageData.LOAD_PAGEDATA_SUCCESS: {
    //   let page: { key: string; value: Page } = action.payload;
    //   console.log(`LOAD_PAGEDATA_SUCCESS`, page);

    //   const existPage = state.entities[page.key];
    //   if (existPage != null) {
    //     let samePage = true;
    //     for (const position of Object.keys(page.value.slots)) {
    //       if (
    //         page.value.slots[position].components.length !==
    //         existPage.slots[position].components.length
    //       ) {
    //         samePage = false;
    //         break;
    //       }
    //     }
    //     if (samePage) {
    //       page = {
    //         ...page,
    //         value: {
    //           ...page.value,
    //           seen: [...page.value.seen, ...existPage.seen]
    //         }
    //       };
    //     }
    //   }

    //   const entities = {
    //     ...state.entities,
    //     [page.key]: page.value
    //   };

    //   return {
    //     ...state,
    //     entities,
    //     count: state.count + 1,
    //     latestPageKey: page.key
    //   };
    // }

    // TODO:#1135 - delete
    // case fromPageData.REFRESH_LATEST_PAGE: {
    //   const entities = {
    //     ...state.pageData.entities,
    //     [state.latestPageId]: null
    //   };
    //   const pageData = {
    //     ...state.pageData,
    //     entities
    //   };

    //   return {
    //     ...state,
    //     pageData
    //   };
    // }
  ) {
  }
  return state;
}
