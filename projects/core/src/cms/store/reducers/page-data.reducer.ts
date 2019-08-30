import { EntityState } from '../../../state/utils/entity/entity-state';
import { Page } from '../../model/page.model';
import { CmsActions } from '../actions/index';

export const initialState: EntityState<Page> = { entities: {} };

export function reducer(
  state = initialState,
  action: CmsActions.LoadCmsPageDataSuccess
): EntityState<Page> {
  switch (action.type) {
    case CmsActions.LOAD_CMS_PAGE_DATA_SUCCESS: {
      const page: Page = action.payload;
      return { ...state, entities: { ...state.entities, [page.pageId]: page } };
    }
  }
  return state;
}
