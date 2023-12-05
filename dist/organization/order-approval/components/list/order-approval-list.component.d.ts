import { OnInit } from '@angular/core';
import { EntitiesModel, RoutingService, SearchConfig, TranslationService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderApproval } from '../../core/model/order-approval.model';
import { OrderApprovalService } from '../../core/services/order-approval.service';
import * as i0 from "@angular/core";
export declare class OrderApprovalListComponent implements OnInit {
    protected routing: RoutingService;
    protected orderApprovalService: OrderApprovalService;
    protected translation: TranslationService;
    constructor(routing: RoutingService, orderApprovalService: OrderApprovalService, translation: TranslationService);
    sortLabels$: Observable<{
        byDate: string;
        byOrderNumber: string;
    }>;
    protected PAGE_SIZE: number;
    sortType: string;
    orderApprovals$: Observable<EntitiesModel<OrderApproval> | undefined>;
    ngOnInit(): void;
    changeSortCode(sortCode: string): void;
    pageChange(page: number): void;
    protected fetchApprovalListPage(searchConfig: SearchConfig): void;
    goToApprovalDetails(event: any, orderApproval: OrderApproval): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderApprovalListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OrderApprovalListComponent, "cx-order-approval-list", never, {}, {}, never, never, false, never>;
}
