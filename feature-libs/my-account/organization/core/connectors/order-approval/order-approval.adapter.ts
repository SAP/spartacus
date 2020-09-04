import { Observable } from 'rxjs';
import {
  OrderApproval,
  OrderApprovalDecision,
  EntitiesModel,
} from '@spartacus/core';
import { B2BSearchConfig } from '../../model/search-config';

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
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<OrderApproval>>;

  abstract makeDecision(
    userId: string,
    orderApprovalCode: string,
    orderApprovalDecision: OrderApprovalDecision
  ): Observable<OrderApprovalDecision>;
}
