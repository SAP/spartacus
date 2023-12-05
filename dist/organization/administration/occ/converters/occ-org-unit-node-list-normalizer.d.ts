import { Converter, Occ } from '@spartacus/core';
import { B2BUnitNode } from '@spartacus/organization/administration/core';
import * as i0 from "@angular/core";
export declare class OccOrgUnitNodeListNormalizer implements Converter<Occ.B2BUnitNodeList, B2BUnitNode[]> {
    convert(source: Occ.B2BUnitNodeList, target?: B2BUnitNode[]): B2BUnitNode[];
    static ɵfac: i0.ɵɵFactoryDeclaration<OccOrgUnitNodeListNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccOrgUnitNodeListNormalizer>;
}
