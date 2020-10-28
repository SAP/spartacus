import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  ActiveCartService,
  CheckoutActions,
  GenericConfigurator,
  GenericConfiguratorUtilsService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ConfiguratorActions } from '../actions/index';

@Injectable()
/**
 * Effect used to hook into the place order action
 */
export class ConfiguratorPlaceOrderHookEffects {
  @Effect()
  placeOrder$: Observable<
    ConfiguratorActions.RemoveConfiguration
  > = this.actions$.pipe(
    ofType(CheckoutActions.PLACE_ORDER),
    map(() => {
      const ownerKeys = [];
      this.activeCartService
        .getEntries()
        .pipe(take(1))
        .subscribe((entries) => {
          entries.forEach((entry) => {
            if (
              !entry.product?.configurable ||
              entry.product?.configuratorType !== 'CPQCONFIGURATOR'
            ) {
              return;
            }

            const owner: GenericConfigurator.Owner = {
              type: GenericConfigurator.OwnerType.CART_ENTRY,
              id: String(entry.entryNumber),
            };
            this.genericConfigUtilsService.setOwnerKey(owner);

            ownerKeys.push(owner.key);
          });
        });
      return new ConfiguratorActions.RemoveConfiguration({
        ownerKey: ownerKeys,
      });
    })
  );

  constructor(
    protected actions$: Actions,
    protected activeCartService: ActiveCartService,
    protected genericConfigUtilsService: GenericConfiguratorUtilsService
  ) {}
}
