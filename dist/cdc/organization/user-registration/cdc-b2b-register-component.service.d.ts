import { FormBuilder, FormGroup } from '@angular/forms';
import { CdcJsService } from '@spartacus/cdc/root';
import { AuthConfigService, AuthService, Command, CommandService, EventService, GlobalMessageService, RoutingService, TranslationService, UserAddressService } from '@spartacus/core';
import { UserRegistrationFormService } from '@spartacus/organization/user-registration/components';
import { UserRegistrationFacade, OrganizationUserRegistrationForm } from '@spartacus/organization/user-registration/root';
import { UserRegisterFacade } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CDCB2BRegisterComponentService extends UserRegistrationFormService {
    protected command: CommandService;
    protected cdcJSService: CdcJsService;
    protected authService: AuthService;
    protected eventService: EventService;
    protected userRegisterFacade: UserRegisterFacade;
    protected userAddressService: UserAddressService;
    protected organizationUserRegistrationFacade: UserRegistrationFacade;
    protected translationService: TranslationService;
    protected globalMessageService: GlobalMessageService;
    protected authConfigService: AuthConfigService;
    protected routingService: RoutingService;
    protected formBuilder: FormBuilder;
    protected registerCommand: Command<{
        orgInfo: OrganizationUserRegistrationForm;
    }, OrganizationUserRegistrationForm>;
    protected loadUserTokenFailed$: Observable<boolean>;
    constructor(command: CommandService, cdcJSService: CdcJsService, authService: AuthService, eventService: EventService, userRegisterFacade: UserRegisterFacade, userAddressService: UserAddressService, organizationUserRegistrationFacade: UserRegistrationFacade, translationService: TranslationService, globalMessageService: GlobalMessageService, authConfigService: AuthConfigService, routingService: RoutingService, formBuilder: FormBuilder);
    /**
     * Register a new user using CDC SDK.
     *
     * @param form as FormGroup
     */
    registerUser(form: FormGroup): Observable<OrganizationUserRegistrationForm>;
    postRegisterMessage(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CDCB2BRegisterComponentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CDCB2BRegisterComponentService>;
}
