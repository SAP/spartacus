import { OrderEntry } from '@spartacus/cart/base/root';
import { Images } from '@spartacus/core';
import { MyAccountV2OrderConsignmentsService } from '../../../order-details';
import { ConsignmentView, OrderHistoryView } from '@spartacus/order/root';
import { OrderCriticalStatus } from '../my-account-v2-order-history.model';
import * as i0 from "@angular/core";
export declare class MyAccountV2OrderConsolidatedInformationComponent {
    protected orderConsignmentsService: MyAccountV2OrderConsignmentsService;
    protected criticalStatuses: OrderCriticalStatus[];
    order?: OrderHistoryView;
    protected readonly IMAGE_COUNT = 4;
    getConsignmentsCount(consignments: ConsignmentView[] | undefined): number;
    getOrderEntriesCount(orderEntries: OrderEntry[] | undefined): number;
    isStatusCritical(status: string): boolean;
    getPickupConsignments(consignments: ConsignmentView[]): ConsignmentView[];
    getDeliveryConsignments(consignments: ConsignmentView[]): ConsignmentView[];
    getDeliveryUnconsignedEntries(unconsignedEntries: OrderEntry[]): OrderEntry[];
    getPickupUnconsignedEntries(unconsignedEntries: OrderEntry[]): OrderEntry[];
    getProductImages(entries: OrderEntry[]): Images[];
    static ɵfac: i0.ɵɵFactoryDeclaration<MyAccountV2OrderConsolidatedInformationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MyAccountV2OrderConsolidatedInformationComponent, "cx-my-account-v2-order-consolidated-information", never, { "order": "order"; }, {}, never, never, false, never>;
}
