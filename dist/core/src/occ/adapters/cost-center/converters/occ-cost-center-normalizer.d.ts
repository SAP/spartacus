import { CostCenter } from '../../../../model/org-unit.model';
import { Converter } from '../../../../util/converter.service';
import { Occ } from '../../../occ-models/occ.models';
import * as i0 from "@angular/core";
export declare class OccCostCenterNormalizer implements Converter<Occ.CostCenter, CostCenter> {
    convert(source: Occ.CostCenter, target?: CostCenter): CostCenter;
    /**
     * Returns the boolean value for a string property that is supposed
     * to be of type boolean.
     */
    protected normalizeBoolean(property: string | boolean | undefined): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccCostCenterNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccCostCenterNormalizer>;
}
