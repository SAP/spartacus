import { AsmCustomer360TabsConfig } from '@spartacus/asm/customer-360/root';
import * as i0 from "@angular/core";
export declare abstract class AsmCustomer360Config {
    asmCustomer360?: AsmCustomer360TabsConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmCustomer360Config, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AsmCustomer360Config>;
}
declare module '@spartacus/core' {
    interface Config extends AsmCustomer360Config {
    }
}
