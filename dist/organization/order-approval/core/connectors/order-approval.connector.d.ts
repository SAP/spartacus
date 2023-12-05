import { EntitiesModel, SearchConfig } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderApproval, OrderApprovalDecision } from '../model/order-approval.model';
import { OrderApprovalAdapter } from './order-approval.adapter';
import * as i0 from "@angular/core";
export declare class OrderApprovalConnector {
    protected adapter: OrderApprovalAdapter;
    constructor(adapter: OrderApprovalAdapter);
    get(userId: string, orderApprovalCode: string): Observable<OrderApproval>;
    getList(userId: string, params?: SearchConfig): Observable<EntitiesModel<OrderApproval>>;
    makeDecision(userId: string, orderApprovalCode: string, orderApprovalDecision: OrderApprovalDecision): Observable<OrderApprovalDecision>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderApprovalConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrderApprovalConnector>;
}
