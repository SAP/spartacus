import { UntypedFormBuilder, UntypedFormArray } from '@angular/forms';
import { ConsentTemplate, GlobalMessageService, Title, User } from '@spartacus/core';
import { UserRegisterFacade, UserSignUp } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class RegisterComponentService {
    protected userRegisterFacade: UserRegisterFacade;
    protected globalMessageService: GlobalMessageService;
    protected fb?: UntypedFormBuilder | undefined;
    constructor(userRegisterFacade: UserRegisterFacade, globalMessageService: GlobalMessageService, fb?: UntypedFormBuilder | undefined);
    /**
     * Register a new user.
     *
     * @param user as UserSignUp
     */
    register(user: UserSignUp): Observable<User>;
    /**
     * Returns titles that can be used for the user profiles.
     */
    getTitles(): Observable<Title[]>;
    /**
     * Show the message after successful registration.
     */
    postRegisterMessage(): void;
    /**
     * Get if any additional consents needs to be provided during registration
     * In core feature, no additional consents are necessary during registration.
     * In integration scenarios, eg: cdc, this method will be overridden to return
     * necessary cdc consents
     */
    getAdditionalConsents(): {
        template: ConsentTemplate;
        required: boolean;
    }[];
    /**
     * Generate form control if any additional consents that needs to be provided during registration
     * In core feature, no additional consents are necessary during registration.
     * In integration scenarios, eg: cdc, this method will be overridden to return
     * form controls for necessary cdc consents
     */
    generateAdditionalConsentsFormControl(): UntypedFormArray | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<RegisterComponentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RegisterComponentService>;
}
