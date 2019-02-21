import * as fromAction from '../actions';
import { Page } from '../../model/page.model';
import { EntityState } from '../../../state/utils/entity/entity-state';

export const initialState: EntityState<Page> = { entities: {} };

export function reducer(
  state = initialState,
  action: fromAction.LoadPageDataSuccess
): EntityState<Page> {
  switch (action.type) {
    case fromAction.LOAD_PAGE_DATA_SUCCESS: {
      const page: Page = action.payload;
      return {...state, entities: {...state.entities, [page.pageId]: page }};
    }
  }
  return state;
}
