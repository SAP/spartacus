import { HttpClient } from '@angular/common/http';
import { ConverterService, EntitiesModel, OccEndpointsService, SearchConfig } from '@spartacus/core';
import { OrderApproval, OrderApprovalDecision } from '../../core/model/order-approval.model';
import { OrderApprovalAdapter } from '../../core/connectors/order-approval.adapter';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccOrderApprovalAdapter implements OrderApprovalAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    load(userId: string, orderApprovalCode: string): Observable<OrderApproval>;
    loadList(userId: string, params?: SearchConfig): Observable<EntitiesModel<OrderApproval>>;
    makeDecision(userId: string, orderApprovalCode: string, orderApprovalDecision: OrderApprovalDecision): Observable<OrderApprovalDecision>;
    protected getOrderApprovalEndpoint(userId: string, orderApprovalCode: string): string;
    protected getOrderApprovalsEndpoint(userId: string, params?: SearchConfig): string;
    protected getOrderApprovalDecisionEndpoint(userId: string, orderApprovalCode: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccOrderApprovalAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccOrderApprovalAdapter>;
}
