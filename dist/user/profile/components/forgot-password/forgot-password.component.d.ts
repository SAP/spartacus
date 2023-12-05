import { UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ForgotPasswordComponentService } from './forgot-password-component.service';
import * as i0 from "@angular/core";
export declare class ForgotPasswordComponent {
    protected service: ForgotPasswordComponentService;
    constructor(service: ForgotPasswordComponentService);
    form: UntypedFormGroup;
    isUpdating$: Observable<boolean>;
    onSubmit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ForgotPasswordComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ForgotPasswordComponent, "cx-forgot-password", never, {}, {}, never, never, false, never>;
}
