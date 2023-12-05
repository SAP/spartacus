import { B2BUnit } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import * as i0 from "@angular/core";
export declare class UnitDetailsComponent {
    protected itemService: ItemService<B2BUnit>;
    protected orgUnitService?: OrgUnitService | undefined;
    model$: Observable<B2BUnit>;
    isInEditMode$: Observable<boolean>;
    readonly isUpdatingUnitAllowed: boolean;
    constructor(itemService: ItemService<B2BUnit>, orgUnitService?: OrgUnitService | undefined);
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitDetailsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UnitDetailsComponent, "cx-org-unit-details", never, {}, {}, never, never, false, never>;
}
