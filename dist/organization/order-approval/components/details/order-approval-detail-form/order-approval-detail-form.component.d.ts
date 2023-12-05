import { OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { OrderApproval, OrderApprovalDecisionValue } from '../../../core/model/order-approval.model';
import { OrderApprovalService } from '../../../core/services/order-approval.service';
import { OrderApprovalDetailService } from '../order-approval-detail.service';
import * as i0 from "@angular/core";
export declare class OrderApprovalDetailFormComponent implements OnDestroy {
    protected orderApprovalDetailService: OrderApprovalDetailService;
    protected orderApprovalService: OrderApprovalService;
    private fb;
    approvalDecisionValue: typeof OrderApprovalDecisionValue;
    approvalDecision: OrderApprovalDecisionValue;
    approvalFormVisible: boolean;
    approvalForm: UntypedFormGroup;
    protected orderApprovalLoading$: Observable<boolean>;
    protected decisionResultLoading$: Observable<boolean>;
    loading$: Observable<boolean>;
    orderApproval$: Observable<OrderApproval | undefined>;
    constructor(orderApprovalDetailService: OrderApprovalDetailService, orderApprovalService: OrderApprovalService, fb: UntypedFormBuilder);
    displayDecisionForm(decision: OrderApprovalDecisionValue): void;
    cancelDecisionForm(): void;
    submitDecision(orderApproval: OrderApproval): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderApprovalDetailFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OrderApprovalDetailFormComponent, "cx-order-approval-detail-form", never, {}, {}, never, never, false, never>;
}
