import { ConsignmentView } from '@spartacus/order/root';
import * as i0 from "@angular/core";
export declare class MyAccountV2ConsignmentEntriesComponent {
    consignments?: ConsignmentView[];
    orderCode?: string;
    getConsignmentNumber(code?: string): string | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<MyAccountV2ConsignmentEntriesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MyAccountV2ConsignmentEntriesComponent, "cx-my-account-v2-consignment-entries", never, { "consignments": "consignments"; "orderCode": "orderCode"; }, {}, never, never, false, never>;
}
