import { Converter, ConverterService, Occ, OrderApprovalPermissionType } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class OccPermissionTypeListNormalizer implements Converter<Occ.OrderApprovalPermissionTypeList, OrderApprovalPermissionType[]> {
    private converter;
    constructor(converter: ConverterService);
    convert(source: Occ.OrderApprovalPermissionTypeList, target?: OrderApprovalPermissionType[]): OrderApprovalPermissionType[];
    static ɵfac: i0.ɵɵFactoryDeclaration<OccPermissionTypeListNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccPermissionTypeListNormalizer>;
}
