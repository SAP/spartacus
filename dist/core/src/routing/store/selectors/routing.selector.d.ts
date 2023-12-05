import { MemoizedSelector } from '@ngrx/store';
import { PageContext } from '../../models/page-context.model';
import { RouterState, State } from '../routing-state';
export declare const getRouterFeatureState: MemoizedSelector<any, State>;
export declare const getRouterState: MemoizedSelector<any, RouterState>;
export declare const getSemanticRoute: MemoizedSelector<any, string>;
export declare const getPageContext: MemoizedSelector<any, PageContext>;
export declare const getNextPageContext: MemoizedSelector<any, PageContext | undefined>;
export declare const isNavigating: MemoizedSelector<any, boolean>;
