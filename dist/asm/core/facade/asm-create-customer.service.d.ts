import { AsmCreateCustomerFacade, CustomerRegistrationForm } from '@spartacus/asm/root';
import { Command, CommandService, User } from '@spartacus/core';
import { Observable } from 'rxjs';
import { AsmConnector } from '../connectors';
import * as i0 from "@angular/core";
export declare class AsmCreateCustomerService implements AsmCreateCustomerFacade {
    protected asmConnector: AsmConnector;
    protected command: CommandService;
    protected createCustomerCommand: Command<{
        user: CustomerRegistrationForm;
    }, User>;
    constructor(asmConnector: AsmConnector, command: CommandService);
    createCustomer(user: CustomerRegistrationForm): Observable<User>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmCreateCustomerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AsmCreateCustomerService>;
}
