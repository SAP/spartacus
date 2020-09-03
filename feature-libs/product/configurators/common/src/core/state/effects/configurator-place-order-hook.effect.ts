import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  ActiveCartService,
  CheckoutActions,
  GenericConfigurator,
  GenericConfigUtilsService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { RemoveConfiguration } from '../actions/configurator.action';

@Injectable()
export class ConfiguratorPlaceOrderHookEffects {
  @Effect()
  placeOrder$: Observable<RemoveConfiguration> = this.actions$.pipe(
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
      return new RemoveConfiguration({ ownerKey: ownerKeys });
    })
  );

  constructor(
    protected actions$: Actions,
    protected activeCartService: ActiveCartService,
    protected genericConfigUtilsService: GenericConfigUtilsService
  ) {}
}
