import { Observable } from 'rxjs';
import { OrganizationUserRegistration } from '../model/user-registration.model';
import * as i0 from "@angular/core";
export declare abstract class UserRegistrationFacade {
    /**
     * Register a new organization user.
     *
     * @param user as OrganizationUserRegistration
     */
    abstract registerUser(user: OrganizationUserRegistration): Observable<OrganizationUserRegistration>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserRegistrationFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserRegistrationFacade>;
}
