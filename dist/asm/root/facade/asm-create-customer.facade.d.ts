import { User } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { CustomerRegistrationForm } from '../model/create-customer.model';
import * as i0 from "@angular/core";
export declare abstract class AsmCreateCustomerFacade {
    abstract createCustomer(user: CustomerRegistrationForm): Observable<User>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmCreateCustomerFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AsmCreateCustomerFacade>;
}
