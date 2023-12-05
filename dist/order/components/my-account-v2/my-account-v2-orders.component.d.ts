import { OnDestroy } from '@angular/core';
import { Product } from '@spartacus/core';
import { MyAccountV2OrderHistoryService } from '@spartacus/order/core';
import { Order, OrderHistoryListView } from '@spartacus/order/root';
import { BehaviorSubject, Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class MyAccountV2OrdersComponent implements OnDestroy {
    protected service: MyAccountV2OrderHistoryService;
    protected PAGE_SIZE: number;
    orders$: Observable<OrderHistoryListView | undefined>;
    isLoaded$: BehaviorSubject<boolean>;
    getProduct(order: Order): Product | undefined;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MyAccountV2OrdersComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MyAccountV2OrdersComponent, "cx-my-account-v2-orders", never, {}, {}, never, never, false, never>;
}
