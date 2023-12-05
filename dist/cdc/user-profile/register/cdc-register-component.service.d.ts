import { UntypedFormArray, UntypedFormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CdcConsentManagementComponentService, CdcJsService } from '@spartacus/cdc/root';
import { AnonymousConsentsService, AuthService, Command, CommandService, ConsentTemplate, ConverterService, EventService, GlobalMessageService } from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { RegisterComponentService } from '@spartacus/user/profile/components';
import { UserProfileFacade, UserRegisterFacade, UserSignUp } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CDCRegisterComponentService extends RegisterComponentService {
    protected userRegisterFacade: UserRegisterFacade;
    protected command: CommandService;
    protected store: Store;
    protected cdcJSService: CdcJsService;
    protected globalMessageService: GlobalMessageService;
    protected authService: AuthService;
    protected eventService: EventService;
    protected userProfileFacade: UserProfileFacade;
    protected cdcConsentManagementService: CdcConsentManagementComponentService;
    protected converter: ConverterService;
    protected fb: UntypedFormBuilder;
    protected anonymousConsentsService: AnonymousConsentsService;
    protected registerCommand: Command<{
        user: UserSignUp;
    }, User>;
    protected loadUserTokenFailed$: Observable<boolean>;
    protected isLoggedIn$: Observable<boolean>;
    constructor(userRegisterFacade: UserRegisterFacade, command: CommandService, store: Store, cdcJSService: CdcJsService, globalMessageService: GlobalMessageService, authService: AuthService, eventService: EventService, userProfileFacade: UserProfileFacade, cdcConsentManagementService: CdcConsentManagementComponentService, converter: ConverterService, fb: UntypedFormBuilder, anonymousConsentsService: AnonymousConsentsService);
    /**
     * Register a new user using CDC SDK.
     *
     * @param user as UserSignUp
     */
    register(user: UserSignUp): Observable<User>;
    /**
     * Return preferences object that needs to be updated during register process
     * @returns preference object
     */
    generatePreferencesObject(): any;
    postRegisterMessage(): void;
    /**
     * fetch consents that exist in commerce and is active in cdc
     * @returns array of consent templates
     */
    fetchCdcConsentsForRegistration(): ConsentTemplate[];
    /**
     * generates a form array with form control for each consent
     * @returns a form array
     */
    generateAdditionalConsentsFormControl(): UntypedFormArray;
    /**
     * creates an array of active cdc consents and makes them mandatory to be provided during registration
     * @returns consent templates in the necessary format for the component
     */
    getAdditionalConsents(): {
        template: ConsentTemplate;
        required: boolean;
    }[];
    static ɵfac: i0.ɵɵFactoryDeclaration<CDCRegisterComponentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CDCRegisterComponentService>;
}
