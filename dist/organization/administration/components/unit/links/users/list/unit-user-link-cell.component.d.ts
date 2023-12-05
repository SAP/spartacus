import { B2BUnit } from '@spartacus/core';
import { B2BUserService } from '@spartacus/organization/administration/core';
import { OutletContextData, TableDataOutletContext } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ItemService } from '../../../../shared/item.service';
import { CellComponent } from '../../../../shared/table/cell.component';
import * as i0 from "@angular/core";
export declare class UnitUserRolesCellComponent extends CellComponent {
    protected outlet: OutletContextData<TableDataOutletContext>;
    protected itemService: ItemService<B2BUnit>;
    protected b2bUserService: B2BUserService;
    unitKey$: Observable<string>;
    constructor(outlet: OutletContextData<TableDataOutletContext>, itemService: ItemService<B2BUnit>, b2bUserService: B2BUserService);
    isUpdatingUserAllowed: boolean;
    getRouterModel(uid: string): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitUserRolesCellComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UnitUserRolesCellComponent, "cx-org-unit-user-link-cell", never, {}, {}, never, never, false, never>;
}
