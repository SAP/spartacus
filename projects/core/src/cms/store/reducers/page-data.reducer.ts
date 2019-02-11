import * as fromAction from '../actions';
import { EntityLoaderAction } from '../../../state';
import { Page } from '../../model/page.model';

const initialState: Page = undefined;

// TODO:#1135 - test
export function pageDataReducer(
  state = initialState,
  action: EntityLoaderAction
): Page {
  switch (action.type) {
    case fromAction.LOAD_PAGEDATA_SUCCESS: {
      const page = action.payload;
      console.log(`page`, page);

      return page;

      // TODO:#1135 - delete
      /*
      const existPage = action.payload.value;
      if (existPage != null) {
        let samePage = true;
        for (const position of Object.keys(page.value.slots)) {
          if (
            page.value.slots[position].components.length !==
            existPage.slots[position].components.length
          ) {
            samePage = false;
            break;
          }
        }
        if (samePage) {
          page = {
            ...page,
            value: {
              ...page.value,
              seen: [...page.value.seen, ...existPage.seen]
            }
          };
        }
      }

      return {
        ...state,
        ...page.value
      };
      */
    }
  }
  return state;
}
