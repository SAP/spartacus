import { Command, CommandService, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { UserEmailFacade } from '@spartacus/user/profile/root';
import { UserProfileConnector } from '../connectors/user-profile.connector';
import * as i0 from "@angular/core";
export declare class UserEmailService implements UserEmailFacade {
    protected userIdService: UserIdService;
    protected userProfileConnector: UserProfileConnector;
    protected command: CommandService;
    constructor(userIdService: UserIdService, userProfileConnector: UserProfileConnector, command: CommandService);
    protected updateCommand: Command<{
        password: string;
        newUid: string;
    }>;
    /**
     * Updates the user's email.
     *
     * @param password to users password to confirm the users
     * @param newUid the new proposed email address.
     */
    update(password: string, newUid: string): Observable<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserEmailService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserEmailService>;
}
