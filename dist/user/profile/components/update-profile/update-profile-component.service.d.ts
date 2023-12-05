import { UntypedFormGroup } from '@angular/forms';
import { GlobalMessageService } from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { Title, UserProfileFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject, Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class UpdateProfileComponentService {
    protected userProfile: UserProfileFacade;
    protected globalMessageService: GlobalMessageService;
    constructor(userProfile: UserProfileFacade, globalMessageService: GlobalMessageService);
    protected user$: Observable<User>;
    protected busy$: BehaviorSubject<boolean>;
    isUpdating$: Observable<boolean>;
    titles$: Observable<Title[]>;
    form: UntypedFormGroup;
    /**
     * Updates the user's details and handles the UI.
     */
    updateProfile(): void;
    protected onSuccess(): void;
    protected onError(_error: Error): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UpdateProfileComponentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UpdateProfileComponentService>;
}
