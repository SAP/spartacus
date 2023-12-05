import { InjectionToken } from '@angular/core';
import { Converter, EntitiesModel } from '@spartacus/core';
import { OrderApproval, OrderApprovalDecision } from '../model/order-approval.model';
export declare const ORDER_APPROVAL_NORMALIZER: InjectionToken<Converter<any, OrderApproval>>;
export declare const ORDER_APPROVALS_NORMALIZER: InjectionToken<Converter<any, EntitiesModel<OrderApproval>>>;
export declare const ORDER_APPROVAL_DECISION_NORMALIZER: InjectionToken<Converter<any, OrderApprovalDecision>>;
