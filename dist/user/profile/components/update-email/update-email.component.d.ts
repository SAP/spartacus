import { UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { UpdateEmailComponentService } from './update-email-component.service';
import * as i0 from "@angular/core";
export declare class UpdateEmailComponent {
    protected service: UpdateEmailComponentService;
    constructor(service: UpdateEmailComponentService);
    form: UntypedFormGroup;
    isUpdating$: Observable<boolean>;
    onSubmit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UpdateEmailComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UpdateEmailComponent, "cx-update-email", never, {}, {}, never, never, false, never>;
}
