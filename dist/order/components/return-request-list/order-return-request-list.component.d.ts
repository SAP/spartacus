import { OnDestroy } from '@angular/core';
import { TranslationService } from '@spartacus/core';
import { OrderReturnRequestFacade, ReturnRequestList } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OrderReturnRequestListComponent implements OnDestroy {
    private returnRequestService;
    private translation;
    constructor(returnRequestService: OrderReturnRequestFacade, translation: TranslationService);
    private PAGE_SIZE;
    sortType: string;
    returnRequests$: Observable<ReturnRequestList | undefined>;
    /**
     * When "Order Return" feature is enabled, this component becomes one tab in
     * TabParagraphContainerComponent. This can be read from TabParagraphContainer.
     */
    tabTitleParam$: Observable<number>;
    ngOnDestroy(): void;
    changeSortCode(sortCode: string): void;
    pageChange(page: number): void;
    getSortLabels(): Observable<{
        byDate: string;
        byRMA: string;
    }>;
    private fetchReturnRequests;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderReturnRequestListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OrderReturnRequestListComponent, "cx-order-return-request-list", never, {}, {}, never, never, false, never>;
}
