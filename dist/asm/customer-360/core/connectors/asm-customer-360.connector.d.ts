import { AsmCustomer360Request, AsmCustomer360Response } from '@spartacus/asm/customer-360/root';
import { Observable } from 'rxjs';
import { AsmCustomer360Adapter } from './asm-customer-360.adapter';
import * as i0 from "@angular/core";
export declare class AsmCustomer360Connector {
    protected asmCustomer360Adapter: AsmCustomer360Adapter;
    constructor(asmCustomer360Adapter: AsmCustomer360Adapter);
    getAsmCustomer360Data(request: AsmCustomer360Request): Observable<AsmCustomer360Response>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmCustomer360Connector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AsmCustomer360Connector>;
}
