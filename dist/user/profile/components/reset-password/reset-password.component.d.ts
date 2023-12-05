import { UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ResetPasswordComponentService } from './reset-password-component.service';
import * as i0 from "@angular/core";
export declare class ResetPasswordComponent {
    protected service: ResetPasswordComponentService;
    form: UntypedFormGroup;
    isUpdating$: Observable<boolean>;
    token$: Observable<string>;
    constructor(service: ResetPasswordComponentService);
    onSubmit(token: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ResetPasswordComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ResetPasswordComponent, "cx-reset-password", never, {}, {}, never, never, false, never>;
}
