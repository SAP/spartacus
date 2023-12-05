import { Observable } from 'rxjs';
import { User } from '@spartacus/user/account/root';
import { UserAccountAdapter } from './user-account.adapter';
import * as i0 from "@angular/core";
export declare class UserAccountConnector {
    protected adapter: UserAccountAdapter;
    constructor(adapter: UserAccountAdapter);
    get(userId: string): Observable<User>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserAccountConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserAccountConnector>;
}
