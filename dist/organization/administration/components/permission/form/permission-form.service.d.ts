import { OnDestroy } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Permission } from '@spartacus/organization/administration/core';
import { Subscription } from 'rxjs';
import { FormService } from '../../shared/form/form.service';
import * as i0 from "@angular/core";
export declare enum PermissionType {
    ORDER = "B2BOrderThresholdPermission",
    TIME_SPAN = "B2BOrderThresholdTimespanPermission",
    EXCEEDED = "B2BBudgetExceededPermission"
}
export declare class PermissionFormService extends FormService<Permission> implements OnDestroy {
    protected subscription: Subscription;
    /**
     * @override
     * Builds a generic sub form for permissions and amends the form
     * based on the for approval permission type.
     */
    protected build(): void;
    /**
     * @override
     * The form is using  `B2BBudgetExceededPermission` by default.
     */
    get defaultValue(): Permission;
    /**
     * Amends the form structure based on the `PermissionType`.
     */
    protected amend(form: UntypedFormGroup, code: PermissionType): void;
    ngOnDestroy(): void;
    protected patchData(item?: Permission): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PermissionFormService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PermissionFormService>;
}
