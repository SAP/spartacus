import { Action } from '@ngrx/store';
import { Region } from '../../../model/address.model';
import { StateUtils } from '../../../state/utils/index';
export declare const LOAD_REGIONS = "[User] Load Regions";
export declare const LOAD_REGIONS_SUCCESS = "[User] Load Regions Success";
export declare const LOAD_REGIONS_FAIL = "[User] Load Regions Fail";
export declare const CLEAR_REGIONS = "[User] Clear Regions";
export declare class LoadRegions extends StateUtils.LoaderLoadAction {
    payload: string;
    readonly type = "[User] Load Regions";
    constructor(payload: string);
}
export declare class LoadRegionsFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[User] Load Regions Fail";
    constructor(payload: any);
}
export declare class LoadRegionsSuccess extends StateUtils.LoaderSuccessAction {
    payload: {
        entities: Region[];
        country: string;
    };
    readonly type = "[User] Load Regions Success";
    constructor(payload: {
        entities: Region[];
        country: string;
    });
}
export declare class ClearRegions implements Action {
    readonly type = "[User] Clear Regions";
    constructor();
}
export type RegionsAction = LoadRegions | LoadRegionsFail | LoadRegionsSuccess | ClearRegions;
