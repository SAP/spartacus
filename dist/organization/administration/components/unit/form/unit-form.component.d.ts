import { OnInit } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { B2BApprovalProcess, B2BUnit } from '@spartacus/core';
import { B2BUnitNode, OrgUnitService } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import * as i0 from "@angular/core";
export declare class UnitFormComponent implements OnInit {
    protected itemService: ItemService<B2BUnit>;
    protected unitService: OrgUnitService;
    i18nRoot: string;
    createChildUnit: boolean;
    form: UntypedFormGroup | null;
    units$: Observable<B2BUnitNode[] | undefined>;
    approvalProcess$: Observable<B2BApprovalProcess[]>;
    constructor(itemService: ItemService<B2BUnit>, unitService: OrgUnitService);
    ngOnInit(): void;
    createUidWithName(name: AbstractControl | null, code: AbstractControl | null): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UnitFormComponent, "cx-org-unit-form", never, { "i18nRoot": "i18nRoot"; "createChildUnit": "createChildUnit"; }, {}, never, never, false, never>;
}
