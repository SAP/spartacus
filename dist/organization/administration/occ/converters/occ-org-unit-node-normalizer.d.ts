import { Converter, Occ } from '@spartacus/core';
import { B2BUnitNode } from '@spartacus/organization/administration/core';
import * as i0 from "@angular/core";
export declare class OccOrgUnitNodeNormalizer implements Converter<Occ.B2BUnitNode, B2BUnitNode> {
    convert(source: Occ.B2BUnitNode, target?: B2BUnitNode): B2BUnitNode;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccOrgUnitNodeNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccOrgUnitNodeNormalizer>;
}
