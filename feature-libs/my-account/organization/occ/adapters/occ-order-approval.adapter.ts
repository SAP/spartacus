import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConverterService,
  EntitiesModel,
  Occ,
  OccEndpointsService,
  SearchConfig,
} from '@spartacus/core';
import {
  OrderApproval,
  OrderApprovalAdapter,
  OrderApprovalDecision,
  ORDER_APPROVALS_NORMALIZER,
  ORDER_APPROVAL_DECISION_NORMALIZER,
  ORDER_APPROVAL_NORMALIZER,
} from '@spartacus/my-account/organization/core';
import { Observable } from 'rxjs';

@Injectable()
export class OccOrderApprovalAdapter implements OrderApprovalAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load(userId: string, orderApprovalCode: string): Observable<OrderApproval> {
    return this.http
      .get<Occ.OrderApproval>(
        this.getOrderApprovalEndpoint(userId, orderApprovalCode)
      )
      .pipe(this.converter.pipeable(ORDER_APPROVAL_NORMALIZER));
  }

  loadList(
    userId: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<OrderApproval>> {
    return this.http
      .get<Occ.OrderApprovalsList>(
        this.getOrderApprovalsEndpoint(userId, params)
      )
      .pipe(this.converter.pipeable(ORDER_APPROVALS_NORMALIZER));
  }

  makeDecision(
    userId: string,
    orderApprovalCode: string,
    orderApprovalDecision: OrderApprovalDecision
  ): Observable<OrderApprovalDecision> {
    return this.http
      .post<Occ.OrderApproval>(
        this.getOrderApprovalDecisionEndpoint(userId, orderApprovalCode),
        orderApprovalDecision
      )
      .pipe(this.converter.pipeable(ORDER_APPROVAL_DECISION_NORMALIZER));
  }

  protected getOrderApprovalEndpoint(
    userId: string,
    orderApprovalCode: string
  ): string {
    return this.occEndpoints.getUrl('orderApproval', {
      userId,
      orderApprovalCode,
    });
  }

  protected getOrderApprovalsEndpoint(
    userId: string,
    params?: SearchConfig
  ): string {
    return this.occEndpoints.getUrl('orderApprovals', { userId }, params);
  }

  protected getOrderApprovalDecisionEndpoint(
    userId: string,
    orderApprovalCode: string
  ): string {
    return this.occEndpoints.getUrl('orderApprovalDecision', {
      userId,
      orderApprovalCode,
    });
  }
}
