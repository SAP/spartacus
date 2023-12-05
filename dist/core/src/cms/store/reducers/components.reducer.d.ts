import { CmsComponent } from '../../../model/cms.model';
import { CmsActions } from '../actions/index';
import { ComponentsContext } from '../cms-state';
export declare const initialState: ComponentsContext;
export declare function reducer<T extends CmsComponent>(state: ComponentsContext | undefined, action: CmsActions.CmsComponentAction<T>): ComponentsContext;
