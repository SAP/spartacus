import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { OrderPlacedEvent } from '@spartacus/checkout/root';
import { ActiveCartService, EventService } from '@spartacus/core';
import {
  CommonConfigurator,
  CommonConfiguratorUtilsService,
  ConfiguratorModelUtils,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ConfiguratorActions } from '../actions/index';

@Injectable()
/**
 * Effect used to hook into the place order action
 */
export class ConfiguratorPlaceOrderHookEffects {
  @Effect()
  placeOrder$: Observable<ConfiguratorActions.RemoveConfiguration> = this.eventService
    .get(OrderPlacedEvent)
    .pipe(
      map(() => {
        const ownerKeys = [];
        this.activeCartService
          .getEntries()
          .pipe(take(1))
          .subscribe((entries) => {
            entries.forEach((entry) => {
              if (
                !entry.product?.configurable ||
                entry.product?.configuratorType !== ConfiguratorType.VARIANT
              ) {
                return;
              }
              const owner = ConfiguratorModelUtils.createOwner(
                CommonConfigurator.OwnerType.CART_ENTRY,
                String(entry.entryNumber)
              );

              this.commonConfigUtilsService.setOwnerKey(owner);

              ownerKeys.push(owner.key);
            });
          });
        return new ConfiguratorActions.RemoveConfiguration({
          ownerKey: ownerKeys,
        });
      })
    );

  constructor(
    protected activeCartService: ActiveCartService,
    protected commonConfigUtilsService: CommonConfiguratorUtilsService,
    protected eventService: EventService
  ) {}
}
