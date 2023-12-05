import { Converter, Occ, OrderApprovalPermissionType } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class OccPermissionTypeNormalizer implements Converter<Occ.OrderApprovalPermissionType, OrderApprovalPermissionType> {
    constructor();
    convert(source: Occ.OrderApprovalPermissionType, target?: OrderApprovalPermissionType): OrderApprovalPermissionType;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccPermissionTypeNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccPermissionTypeNormalizer>;
}
