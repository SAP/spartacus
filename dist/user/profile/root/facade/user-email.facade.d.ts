import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare abstract class UserEmailFacade {
    /**
     * Updates the user's email.
     *
     * @param password to users password to confirm the users
     * @param newUid the new proposed email address.
     */
    abstract update(password: string, newUid: string): Observable<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserEmailFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserEmailFacade>;
}
