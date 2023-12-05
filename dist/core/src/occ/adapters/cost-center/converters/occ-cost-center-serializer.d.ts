import { CostCenter } from '../../../../model/org-unit.model';
import { Converter } from '../../../../util/converter.service';
import { Occ } from '../../../occ-models/occ.models';
import * as i0 from "@angular/core";
export declare class OccCostCenterSerializer implements Converter<CostCenter, Occ.CostCenter> {
    convert(source: CostCenter, target?: Occ.CostCenter): Occ.CostCenter;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccCostCenterSerializer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccCostCenterSerializer>;
}
