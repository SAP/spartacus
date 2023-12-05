import { EntityState } from '../../../state/utils/entity/entity-state';
import { Page } from '../../model/page.model';
import { CmsActions } from '../actions/index';
export declare const initialState: EntityState<Page>;
export declare function reducer(state: EntityState<Page> | undefined, action: CmsActions.LoadCmsPageDataSuccess): EntityState<Page>;
