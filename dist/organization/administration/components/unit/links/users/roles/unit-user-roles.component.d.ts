import { UntypedFormGroup } from '@angular/forms';
import { B2BUser, B2BUserRole, B2BUserRight } from '@spartacus/core';
import { B2BUserService } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../../../shared/item.service';
import { MessageService } from '../../../../shared/message/services/message.service';
import { UserItemService } from '../../../../user/services/user-item.service';
import { UnitUserRolesFormService } from './unit-user-roles-form.service';
import * as i0 from "@angular/core";
export declare class UnitUserRolesFormComponent {
    protected itemService: ItemService<B2BUser>;
    protected formService: UnitUserRolesFormService;
    protected userService: B2BUserService;
    protected userItemService: UserItemService;
    protected item: B2BUser | undefined;
    messageService: MessageService;
    form$: Observable<UntypedFormGroup | null>;
    availableRoles: B2BUserRole[];
    availableRights: B2BUserRight[];
    constructor(itemService: ItemService<B2BUser>, formService: UnitUserRolesFormService, userService: B2BUserService, userItemService: UserItemService);
    save(form: UntypedFormGroup): void;
    protected notify(item: B2BUser): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitUserRolesFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UnitUserRolesFormComponent, "cx-org-unit-user-roles", never, {}, {}, never, never, false, never>;
}
