import { Command, CommandService } from '@spartacus/core';
import { UserRegistrationFacade, OrganizationUserRegistration } from '@spartacus/organization/user-registration/root';
import { Observable } from 'rxjs';
import { UserRegistrationConnector } from '../connectors/user-registration.connector';
import * as i0 from "@angular/core";
export declare class UserRegistrationService implements UserRegistrationFacade {
    protected userRegistrationConnector: UserRegistrationConnector;
    protected command: CommandService;
    protected registerOrganizationUserCommand: Command<{
        userData: OrganizationUserRegistration;
    }, OrganizationUserRegistration>;
    constructor(userRegistrationConnector: UserRegistrationConnector, command: CommandService);
    /**
     * Register a new org user.
     *
     * @param userData
     */
    registerUser(userData: OrganizationUserRegistration): Observable<OrganizationUserRegistration>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserRegistrationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserRegistrationService>;
}
