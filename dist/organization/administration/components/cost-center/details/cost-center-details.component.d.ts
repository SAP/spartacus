import { CostCenter } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import * as i0 from "@angular/core";
export declare class CostCenterDetailsComponent {
    protected itemService: ItemService<CostCenter>;
    model$: Observable<CostCenter>;
    isInEditMode$: Observable<boolean>;
    constructor(itemService: ItemService<CostCenter>);
    static ɵfac: i0.ɵɵFactoryDeclaration<CostCenterDetailsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CostCenterDetailsComponent, "cx-org-cost-center-details", never, {}, {}, never, never, false, never>;
}
