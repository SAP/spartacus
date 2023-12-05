import { UntypedFormGroup } from '@angular/forms';
import { User } from '@spartacus/core';
import { FormService } from '../../shared/form/form.service';
import * as i0 from "@angular/core";
export declare class UserChangePasswordFormService extends FormService<any> {
    /**
     * @override
     * Adds the password and confirmPassword field. Also adds the customerId field,
     * so that the customerId can be used during persistent.
     */
    protected build(): void;
    getForm(item?: User): UntypedFormGroup | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserChangePasswordFormService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserChangePasswordFormService>;
}
