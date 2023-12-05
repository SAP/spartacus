import { Converter, Occ, B2BApprovalProcess } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class OccOrgUnitApprovalProcessNormalizer implements Converter<Occ.B2BApprovalProcessList, B2BApprovalProcess[]> {
    constructor();
    convert(source: Occ.B2BApprovalProcessList, target?: B2BApprovalProcess[]): B2BApprovalProcess[];
    static ɵfac: i0.ɵɵFactoryDeclaration<OccOrgUnitApprovalProcessNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccOrgUnitApprovalProcessNormalizer>;
}
