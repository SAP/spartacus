import { CellComponent } from '../../shared';
import { B2BUserService } from '@spartacus/organization/administration/core';
import { B2BUser } from '@spartacus/core';
import { OutletContextData, TableDataOutletContext } from '@spartacus/storefront';
import * as i0 from "@angular/core";
export declare class UserDetailsCellComponent extends CellComponent {
    protected b2bUserService: B2BUserService;
    protected outlet: OutletContextData<TableDataOutletContext>;
    b2bUserModel: B2BUser;
    availableRoles: string[];
    availableRights: string[];
    constructor(b2bUserService: B2BUserService, outlet: OutletContextData<TableDataOutletContext>);
    hasRight(model: B2BUser): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserDetailsCellComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UserDetailsCellComponent, "cx-org-user-details-cell", never, {}, {}, never, never, false, never>;
}
