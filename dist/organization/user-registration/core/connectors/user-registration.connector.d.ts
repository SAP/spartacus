import { Observable } from 'rxjs';
import { OrganizationUserRegistration } from '@spartacus/organization/user-registration/root';
import { UserRegistrationAdapter } from './user-registration.adapter';
import * as i0 from "@angular/core";
export declare class UserRegistrationConnector {
    protected adapter: UserRegistrationAdapter;
    constructor(adapter: UserRegistrationAdapter);
    registerUser(userData: OrganizationUserRegistration): Observable<OrganizationUserRegistration>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserRegistrationConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserRegistrationConnector>;
}
