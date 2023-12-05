import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { AuthConfigService, Country, GlobalMessageService, Region, RoutingService, TranslationService, UserAddressService } from '@spartacus/core';
import { OrganizationUserRegistration, UserRegistrationFacade } from '@spartacus/organization/user-registration/root';
import { Title, UserRegisterFacade } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class UserRegistrationFormService {
    protected userRegisterFacade: UserRegisterFacade;
    protected userAddressService: UserAddressService;
    protected organizationUserRegistrationFacade: UserRegistrationFacade;
    protected translationService: TranslationService;
    protected globalMessageService: GlobalMessageService;
    protected authConfigService: AuthConfigService;
    protected routingService: RoutingService;
    protected formBuilder: FormBuilder;
    private _form;
    protected buildForm(): FormGroup;
    get form(): FormGroup;
    get countryControl(): AbstractControl | null;
    get regionControl(): AbstractControl | null;
    constructor(userRegisterFacade: UserRegisterFacade, userAddressService: UserAddressService, organizationUserRegistrationFacade: UserRegistrationFacade, translationService: TranslationService, globalMessageService: GlobalMessageService, authConfigService: AuthConfigService, routingService: RoutingService, formBuilder: FormBuilder);
    /**
     * Gets all title codes.
     */
    getTitles(): Observable<Title[]>;
    /**
     * Gets all countries list.
     */
    getCountries(): Observable<Country[]>;
    /**
     * Gets all regions list for specific selected country.
     */
    getRegions(): Observable<Region[]>;
    /**
     * Takes form values and builds custom message content.
     */
    protected buildMessageContent(form: FormGroup): Observable<string>;
    /**
     * Displays confirmation global message.
     */
    protected displayGlobalMessage(): void;
    /**
     * Redirects the user back to the login page.
     *
     * This only happens in case of the `ResourceOwnerPasswordFlow` OAuth flow.
     */
    protected redirectToLogin(): void;
    /**
     * Registers new organization user.
     */
    registerUser(form: FormGroup): Observable<OrganizationUserRegistration>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserRegistrationFormService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserRegistrationFormService>;
}
