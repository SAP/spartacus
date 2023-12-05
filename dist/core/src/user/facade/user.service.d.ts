import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { Title } from '../../model/misc.model';
import { StateWithProcess } from '../../process/store/process-state';
import { StateWithUser } from '../store/user-state';
import { UserProfileFacadeTransitionalToken } from '../user-transitional-tokens';
import * as i0 from "@angular/core";
export declare class UserService {
    protected store: Store<StateWithUser | StateWithProcess<void>>;
    protected userIdService: UserIdService;
    protected userProfileFacade?: UserProfileFacadeTransitionalToken | undefined;
    constructor(store: Store<StateWithUser | StateWithProcess<void>>, userIdService: UserIdService, userProfileFacade?: UserProfileFacadeTransitionalToken | undefined);
    /**
     * Returns titles.
     *
     * @deprecated since 3.2, use `UserProfileFacade.getTitles()` from `@spartacus/user` package.
     * We can remove it completely once we move the user-address feature to the User lib.
     */
    getTitles(): Observable<Title[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserService, [null, null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserService>;
}
