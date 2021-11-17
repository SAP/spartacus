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
  OrderApprovalDecision,
} from '../../core/model/order-approval.model';
import { OrderApprovalAdapter } from '../../core/connectors/order-approval.adapter';
import {
  ORDER_APPROVALS_NORMALIZER,
  ORDER_APPROVAL_DECISION_NORMALIZER,
  ORDER_APPROVAL_NORMALIZER,
} from '../../core/connectors/converters';
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
    return this.occEndpoints.buildUrl('orderApproval', {
      urlParams: {
        userId,
        orderApprovalCode,
      },
    });
  }

  protected getOrderApprovalsEndpoint(
    userId: string,
    params?: SearchConfig
  ): string {
    return this.occEndpoints.buildUrl('orderApprovals', {
      urlParams: { userId },
      queryParams: params,
    });
  }

  protected getOrderApprovalDecisionEndpoint(
    userId: string,
    orderApprovalCode: string
  ): string {
    return this.occEndpoints.buildUrl('orderApprovalDecision', {
      urlParams: {
        userId,
        orderApprovalCode,
      },
    });
  }
}
