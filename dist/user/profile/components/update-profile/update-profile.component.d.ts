import { UntypedFormGroup } from '@angular/forms';
import { Title } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';
import { UpdateProfileComponentService } from './update-profile-component.service';
import * as i0 from "@angular/core";
export declare class UpdateProfileComponent {
    protected service: UpdateProfileComponentService;
    constructor(service: UpdateProfileComponentService);
    form: UntypedFormGroup;
    isUpdating$: Observable<boolean>;
    titles$: Observable<Title[]>;
    onSubmit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UpdateProfileComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UpdateProfileComponent, "cx-update-profile", never, {}, {}, never, never, false, never>;
}
