import { Store } from '@ngrx/store';
import { EntitiesModel, SearchConfig, StateWithProcess, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderApproval, OrderApprovalDecision } from '../model/order-approval.model';
import { OrderApprovalState } from '../store/order-approval-state';
import * as i0 from "@angular/core";
export declare class OrderApprovalService {
    protected store: Store<OrderApprovalState | StateWithProcess<void>>;
    protected userIdService: UserIdService;
    constructor(store: Store<OrderApprovalState | StateWithProcess<void>>, userIdService: UserIdService);
    loadOrderApproval(orderApprovalCode: string): void;
    loadOrderApprovals(params: SearchConfig): void;
    private getOrderApproval;
    private getOrderApprovalList;
    get(orderApprovalCode: string): Observable<OrderApproval | undefined>;
    /**
     * Emits true if a request is currently fetching order approval data from
     * the server.
     *
     * @param orderApprovalCode The approval code for which we want the loading status.
     */
    getOrderApprovalLoading(orderApprovalCode: string): Observable<boolean>;
    getList(params: SearchConfig): Observable<EntitiesModel<OrderApproval> | undefined>;
    makeDecision(orderApprovalCode: string, orderApprovalDecision: OrderApprovalDecision): void;
    /**
     * Returns the makeDecision loading flag.  Returns true when the process triggered
     * by makeDecision() is currently running.
     */
    getMakeDecisionResultLoading(): Observable<boolean>;
    /**
     * Returns the makeDecision failure outcome.  Returns true when the outcome
     * of makeDecision() was an error.
     */
    getMakeDecisionResultError(): Observable<boolean>;
    /**
     * Returns the makeDecision process success outcome.  Returns true when the outcome
     * of makeDecision() was a success.
     */
    getMakeDecisionResultSuccess(): Observable<boolean>;
    /**
     * Resets the makeDecision process state. It is usually preferable to reset the
     * process state before making a call to makeDecision() for which we then want
     * to monitor the loading state or the outcome.
     */
    resetMakeDecisionProcessState(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderApprovalService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrderApprovalService>;
}
