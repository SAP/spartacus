import { AsmCustomer360Facade, AsmCustomer360Response, AsmCustomer360TabComponent } from '@spartacus/asm/customer-360/root';
import { Command, CommandService } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { AsmCustomer360Connector } from '../connectors/asm-customer-360.connector';
import * as i0 from "@angular/core";
export declare class AsmCustomer360Service implements AsmCustomer360Facade {
    protected commandService: CommandService;
    protected asmCustomer360Connector: AsmCustomer360Connector;
    protected userAccountFacade: UserAccountFacade;
    protected asmCustomer360Command$: Command<Array<AsmCustomer360TabComponent>, AsmCustomer360Response>;
    constructor(commandService: CommandService, asmCustomer360Connector: AsmCustomer360Connector, userAccountFacade: UserAccountFacade);
    get360Data(components: Array<AsmCustomer360TabComponent>): Observable<AsmCustomer360Response | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmCustomer360Service, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AsmCustomer360Service>;
}
