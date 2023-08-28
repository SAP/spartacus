import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  RoutingService,
  StateWithProcess,
  UserIdService,
} from '@spartacus/core';
import { OrderHistoryService, StateWithOrder } from '@spartacus/order/core';

@Injectable()
export class NewMyaccountOrderHistoryService extends OrderHistoryService {
  constructor(
    protected store: Store<StateWithOrder>,
    protected processStateStore: Store<StateWithProcess<void>>,
    protected userIdService: UserIdService,
    protected routingService: RoutingService
  ) {
    super(store, processStateStore, userIdService, routingService);
  }
}
