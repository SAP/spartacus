import { OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Currency, CurrencyService, OrderApprovalPermissionType } from '@spartacus/core';
import { B2BUnitNode, OrgUnitService, Permission, PermissionService } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import * as i0 from "@angular/core";
export declare class PermissionFormComponent implements OnInit {
    protected itemService: ItemService<Permission>;
    protected unitService: OrgUnitService;
    protected currencyService: CurrencyService;
    protected permissionService: PermissionService;
    form: UntypedFormGroup | null;
    units$: Observable<B2BUnitNode[] | undefined>;
    currencies$: Observable<Currency[]>;
    types$: Observable<OrderApprovalPermissionType[] | undefined>;
    periods: string[];
    constructor(itemService: ItemService<Permission>, unitService: OrgUnitService, currencyService: CurrencyService, permissionService: PermissionService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PermissionFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PermissionFormComponent, "cx-org-permission-form", never, {}, {}, never, never, false, never>;
}
