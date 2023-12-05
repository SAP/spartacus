import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import * as i0 from "@angular/core";
export declare abstract class UserAccountFacade {
    abstract get(): Observable<User | undefined>;
    abstract getById(userId: string): Observable<User | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserAccountFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserAccountFacade>;
}
