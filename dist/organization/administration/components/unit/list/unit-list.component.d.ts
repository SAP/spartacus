import { OrgUnitService } from '@spartacus/organization/administration/core';
import { UnitTreeService } from '../services/unit-tree.service';
import * as i0 from "@angular/core";
export declare class UnitListComponent {
    protected unitTreeService: UnitTreeService;
    protected orgUnitService?: OrgUnitService | undefined;
    constructor(unitTreeService: UnitTreeService, orgUnitService?: OrgUnitService | undefined);
    readonly isUpdatingUnitAllowed: boolean;
    expandAll(): void;
    collapseAll(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UnitListComponent, "cx-org-unit-list", never, {}, {}, never, never, false, never>;
}
