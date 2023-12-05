import { AsmBindCartFacade } from '@spartacus/asm/root';
import { Command, CommandService } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { AsmConnector } from '../connectors';
import * as i0 from "@angular/core";
export declare class AsmBindCartService implements AsmBindCartFacade {
    protected commandService: CommandService;
    protected asmConnector: AsmConnector;
    protected userAccountFacade: UserAccountFacade;
    constructor(commandService: CommandService, asmConnector: AsmConnector, userAccountFacade: UserAccountFacade);
    protected bindCartCommand$: Command<string, unknown>;
    bindCart(cartId: string): Observable<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmBindCartService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AsmBindCartService>;
}
