import { MyAccountV2OrderHistoryService } from '@spartacus/order/core';
import { OrderHistoryListView } from '@spartacus/order/root';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderHistoryComponent } from '../order-history.component';
import * as i0 from "@angular/core";
export declare class MyAccountV2OrderHistoryComponent extends OrderHistoryComponent {
    protected service: MyAccountV2OrderHistoryService;
    protected readonly ITEMS_PER_PAGE = 5;
    isLoaded$: BehaviorSubject<boolean>;
    orders$: Observable<OrderHistoryListView | undefined>;
    pageChange(page: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MyAccountV2OrderHistoryComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MyAccountV2OrderHistoryComponent, "cx-my-account-v2-order-history", never, {}, {}, never, never, false, never>;
}
