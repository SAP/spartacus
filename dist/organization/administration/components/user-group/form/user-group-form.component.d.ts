import { OnInit } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { B2BUnitNode, OrgUnitService, UserGroup } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import * as i0 from "@angular/core";
export declare class UserGroupFormComponent implements OnInit {
    protected itemService: ItemService<UserGroup>;
    protected unitService: OrgUnitService;
    form: UntypedFormGroup | null;
    units$: Observable<B2BUnitNode[] | undefined>;
    constructor(itemService: ItemService<UserGroup>, unitService: OrgUnitService);
    ngOnInit(): void;
    createUidWithName(name: AbstractControl | null, code: AbstractControl | null): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserGroupFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UserGroupFormComponent, "cx-org-user-group-form", never, {}, {}, never, never, false, never>;
}
