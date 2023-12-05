import { AuthService, Command, CommandService, EventService, Query, QueryService, UserIdService } from '@spartacus/core';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { Title, UserProfileFacade } from '@spartacus/user/profile/root';
import { UserProfileConnector } from '../connectors/user-profile.connector';
import * as i0 from "@angular/core";
export declare class UserProfileService implements UserProfileFacade {
    protected userAccountService: UserAccountFacade;
    protected authService: AuthService;
    protected userProfileConnector: UserProfileConnector;
    protected eventService: EventService;
    protected userIdService: UserIdService;
    protected query: QueryService;
    protected command: CommandService;
    protected updateCommand: Command<{
        details: User;
    }>;
    protected closeCommand: Command;
    protected titleQuery: Query<Title[]>;
    constructor(userAccountService: UserAccountFacade, authService: AuthService, userProfileConnector: UserProfileConnector, eventService: EventService, userIdService: UserIdService, query: QueryService, command: CommandService);
    get(): Observable<User | undefined>;
    /**
     * Updates the user's details.
     *
     * @param details User details to be updated.
     */
    update(details: User): Observable<unknown>;
    /**
     * Closes the user account.
     */
    close(): Observable<unknown>;
    /**
     * Returns titles that can be used for the user profiles.
     */
    getTitles(): Observable<Title[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserProfileService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserProfileService>;
}
