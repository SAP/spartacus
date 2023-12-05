import { Query, QueryService, UserIdService } from '@spartacus/core';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { UserAccountConnector } from '../connectors/user-account.connector';
import * as i0 from "@angular/core";
export declare class UserAccountService implements UserAccountFacade {
    protected userAccountConnector: UserAccountConnector;
    protected userIdService: UserIdService;
    protected query: QueryService;
    protected userQuery: Query<User>;
    constructor(userAccountConnector: UserAccountConnector, userIdService: UserIdService, query: QueryService);
    /**
     * Returns the user according the userId
     * no use query for userId can change every time
     */
    getById(userId: string): Observable<User | undefined>;
    /**
     * Returns the current user.
     */
    get(): Observable<User | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserAccountService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserAccountService>;
}
