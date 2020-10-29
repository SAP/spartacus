import { EntitiesModel, SearchConfig } from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  OrderApproval,
  OrderApprovalDecision,
} from '../model/order-approval.model';

export abstract class OrderApprovalAdapter {
  /**
   * Abstract method used to load orderApprovalManagement's details data.
   * OrderApproval's data can be loaded from alternative sources, as long as the structure
   * converts to the `OrderApproval`.
   *
   * @param userId The `userId` for given orderApprovalManagement
   * @param orderApprovalCode The `orderApprovalCode` for given orderApprovalManagement
   */
  abstract load(
    userId: string,
    orderApprovalCode: string
  ): Observable<OrderApproval>;

  abstract loadList(
    userId: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<OrderApproval>>;

  abstract makeDecision(
    userId: string,
    orderApprovalCode: string,
    orderApprovalDecision: OrderApprovalDecision
  ): Observable<OrderApprovalDecision>;
}
