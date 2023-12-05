import { StateUtils } from '@spartacus/core';
import { Configurator } from '../../model/configurator.model';
export declare const SEARCH_VARIANTS = "[Configurator] Search Variants";
export declare const SEARCH_VARIANTS_FAIL = "[Configurator]  Search Variants fail";
export declare const SEARCH_VARIANTS_SUCCESS = "[Configurator] Search Variants success";
export declare class SearchVariants extends StateUtils.EntityLoadAction {
    payload: Configurator.Configuration;
    readonly type = "[Configurator] Search Variants";
    constructor(payload: Configurator.Configuration);
}
export declare class SearchVariantsFail extends StateUtils.EntityFailAction {
    payload: {
        ownerKey: string;
        error: any;
    };
    readonly type = "[Configurator]  Search Variants fail";
    constructor(payload: {
        ownerKey: string;
        error: any;
    });
}
export declare class SearchVariantsSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        ownerKey: string;
        variants: Configurator.Variant[];
    };
    readonly type = "[Configurator] Search Variants success";
    constructor(payload: {
        ownerKey: string;
        variants: Configurator.Variant[];
    });
}
export type ConfiguratorVariantAction = SearchVariants | SearchVariantsFail | SearchVariantsSuccess;
