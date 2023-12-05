import { UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { UpdatePasswordComponentService } from './update-password-component.service';
import * as i0 from "@angular/core";
export declare class UpdatePasswordComponent {
    protected service: UpdatePasswordComponentService;
    constructor(service: UpdatePasswordComponentService);
    form: UntypedFormGroup;
    isUpdating$: Observable<boolean>;
    onSubmit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UpdatePasswordComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UpdatePasswordComponent, "cx-update-password", never, {}, {}, never, never, false, never>;
}
