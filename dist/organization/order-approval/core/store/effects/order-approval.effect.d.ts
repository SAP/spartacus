import { Actions } from '@ngrx/effects';
import { LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderApprovalConnector } from '../../connectors/order-approval.connector';
import { OrderApprovalActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class OrderApprovalEffects {
    private actions$;
    private orderApprovalConnector;
    protected logger: LoggerService;
    loadOrderApproval$: Observable<OrderApprovalActions.LoadOrderApprovalSuccess | OrderApprovalActions.LoadOrderApprovalFail>;
    loadOrderApprovals$: Observable<OrderApprovalActions.LoadOrderApprovalsSuccess | OrderApprovalActions.LoadOrderApprovalSuccess | OrderApprovalActions.LoadOrderApprovalsFail>;
    makeDecision$: Observable<OrderApprovalActions.MakeDecisionSuccess | OrderApprovalActions.LoadOrderApproval | OrderApprovalActions.MakeDecisionFail>;
    constructor(actions$: Actions, orderApprovalConnector: OrderApprovalConnector);
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderApprovalEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrderApprovalEffects>;
}
