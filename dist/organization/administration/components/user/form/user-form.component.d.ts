import { OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { B2BUser, B2BUserRole, B2BUserRight, Title } from '@spartacus/core';
import { B2BUnitNode, B2BUserService, OrgUnitService } from '@spartacus/organization/administration/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import * as i0 from "@angular/core";
export declare class UserFormComponent implements OnInit {
    protected itemService: ItemService<B2BUser>;
    protected unitService: OrgUnitService;
    protected userProfileFacade: UserProfileFacade;
    protected b2bUserService: B2BUserService;
    form: UntypedFormGroup | null;
    /**
     * Initialize the business unit for the user.
     *
     * If there's a unit provided, we disable the unit form control.
     */
    set unitKey(value: string | null);
    units$: Observable<B2BUnitNode[] | undefined>;
    titles$: Observable<Title[]>;
    availableRoles: B2BUserRole[];
    availableRights: B2BUserRight[];
    constructor(itemService: ItemService<B2BUser>, unitService: OrgUnitService, userProfileFacade: UserProfileFacade, b2bUserService: B2BUserService);
    ngOnInit(): void;
    updateRoles(event: MouseEvent): void;
    get roles(): UntypedFormArray;
    get isAssignedToApprovers(): UntypedFormControl;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UserFormComponent, "cx-org-user-form", never, { "unitKey": "unitKey"; }, {}, never, never, false, never>;
}
