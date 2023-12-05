import { MemoizedSelector } from '@ngrx/store';
import { CmsComponent } from '../../../model/cms.model';
import { StateUtils } from '../../../state/utils/index';
import { ComponentsContext, ComponentsState, StateWithCms } from '../cms-state';
export declare const getComponentsState: MemoizedSelector<StateWithCms, ComponentsState>;
export declare const componentsContextSelectorFactory: (uid: string) => MemoizedSelector<StateWithCms, ComponentsContext | undefined>;
export declare const componentsLoaderStateSelectorFactory: (uid: string, context: string) => MemoizedSelector<StateWithCms, StateUtils.LoaderState<boolean>>;
/**
 * This selector will return:
 *   - true: component for this context exists
 *   - false: component for this context doesn't exist
 *   - undefined: if the exists status for component is unknown
 *
 * @param uid
 * @param context
 */
export declare const componentsContextExistsSelectorFactory: (uid: string, context: string) => MemoizedSelector<StateWithCms, boolean>;
export declare const componentsDataSelectorFactory: (uid: string) => MemoizedSelector<StateWithCms, CmsComponent | undefined>;
/**
 * This selector will return:
 *   - CmsComponent instance: if we have component data for specified context
 *   - null: if there is no component data for specified context
 *   - undefined: if status of component data for specified context is unknown
 *
 * @param uid
 * @param context
 */
export declare const componentsSelectorFactory: (uid: string, context: string) => MemoizedSelector<StateWithCms, CmsComponent | null | undefined>;
