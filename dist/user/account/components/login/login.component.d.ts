import { OnInit } from '@angular/core';
import { AuthService } from '@spartacus/core';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class LoginComponent implements OnInit {
    private auth;
    private userAccount;
    user$: Observable<User | undefined>;
    constructor(auth: AuthService, userAccount: UserAccountFacade);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LoginComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LoginComponent, "cx-login", never, {}, {}, never, never, false, never>;
}
