import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrderPlacedEvent } from '@spartacus/checkout/root';
import { EventService } from '@spartacus/core';
import { ConfiguratorActions } from '../state/actions/index';
import { StateWithConfigurator } from '../state/configurator-state';

@Injectable({ providedIn: 'root' })
export class ConfiguratorPlaceOrderService {
  constructor(
    protected store: Store<StateWithConfigurator>,
    protected eventService: EventService
  ) {}

  init(): void {
    this.eventService.get(OrderPlacedEvent).subscribe(() => {
      this.store.dispatch(
        new ConfiguratorActions.RemoveCartBoundConfigurations()
      );
    });
  }
}
