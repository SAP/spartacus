import { User } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { Title } from '../model/user-profile.model';
import * as i0 from "@angular/core";
export declare abstract class UserProfileFacade {
    abstract get(): Observable<User | undefined>;
    /**
     * Updates the user's details.
     *
     * @param details User details to be updated.
     */
    abstract update(details: User): Observable<unknown>;
    /**
     * Closes the user account.
     */
    abstract close(): Observable<unknown>;
    /**
     * Returns titles that can be used for the user profiles.
     */
    abstract getTitles(): Observable<Title[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserProfileFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserProfileFacade>;
}
