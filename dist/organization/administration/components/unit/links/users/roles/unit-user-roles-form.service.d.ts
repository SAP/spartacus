import { UntypedFormGroup } from '@angular/forms';
import { B2BUser, B2BUserRole, B2BUserRight } from '@spartacus/core';
import { B2BUserService } from '@spartacus/organization/administration/core';
import { FormService } from '../../../../shared/form/form.service';
import * as i0 from "@angular/core";
export declare class UnitUserRolesFormService extends FormService<B2BUser> {
    protected userService: B2BUserService;
    availableRoles: B2BUserRole[];
    availableRights: B2BUserRight[];
    constructor(userService: B2BUserService);
    getForm(item?: B2BUser): UntypedFormGroup | null;
    protected build(): void;
    protected patchData(item: B2BUser): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitUserRolesFormService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnitUserRolesFormService>;
}
