import { OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Country, Region } from '@spartacus/core';
import { Title } from '@spartacus/user/profile/root';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserRegistrationFormService } from './user-registration-form.service';
import * as i0 from "@angular/core";
export declare class UserRegistrationFormComponent implements OnDestroy {
    protected userRegistrationFormService: UserRegistrationFormService;
    titles$: Observable<Title[]>;
    countries$: Observable<Country[]>;
    regions$: Observable<Region[]>;
    registerForm: FormGroup;
    isLoading$: BehaviorSubject<boolean>;
    protected subscriptions: Subscription;
    constructor(userRegistrationFormService: UserRegistrationFormService);
    submit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserRegistrationFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UserRegistrationFormComponent, "cx-user-registration-form", never, {}, {}, never, never, false, never>;
}
