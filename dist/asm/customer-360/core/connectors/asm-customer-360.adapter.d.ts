import { AsmCustomer360Request, AsmCustomer360Response } from '@spartacus/asm/customer-360/root';
import { Observable } from 'rxjs';
export declare abstract class AsmCustomer360Adapter {
    /**
     * Fetches data needed for certain ASM components.
     */
    abstract getAsmCustomer360Data(request: AsmCustomer360Request): Observable<AsmCustomer360Response>;
}
