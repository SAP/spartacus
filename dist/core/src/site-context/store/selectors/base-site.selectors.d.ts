import { MemoizedSelector } from '@ngrx/store';
import { BaseSite } from '../../../model/misc.model';
import { BaseSiteEntities, BaseSiteState, StateWithSiteContext } from '../state';
export declare const getBaseSiteState: MemoizedSelector<StateWithSiteContext, BaseSiteState>;
export declare const getActiveBaseSite: MemoizedSelector<StateWithSiteContext, string>;
export declare const getBaseSiteData: MemoizedSelector<StateWithSiteContext, BaseSite>;
export declare const getBaseSitesEntities: MemoizedSelector<StateWithSiteContext, BaseSiteEntities | null>;
export declare const getAllBaseSites: MemoizedSelector<StateWithSiteContext, BaseSite[] | null>;
