import { UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginFormComponentService } from './login-form-component.service';
import * as i0 from "@angular/core";
export declare class LoginFormComponent {
    protected service: LoginFormComponentService;
    constructor(service: LoginFormComponentService);
    form: UntypedFormGroup;
    isUpdating$: Observable<boolean>;
    style: boolean;
    onSubmit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LoginFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LoginFormComponent, "cx-login-form", never, {}, {}, never, never, false, never>;
}
