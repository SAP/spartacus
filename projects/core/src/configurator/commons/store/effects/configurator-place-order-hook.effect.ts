import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ActiveCartService } from '../../../../cart/facade/active-cart.service';
import { PLACE_ORDER } from '../../../../checkout/store/actions/checkout.action';
import { GenericConfigurator } from '../../../../model/generic-configurator.model';
import { GenericConfigUtilsService } from '../../../generic/utils/config-utils.service';
import { RemoveConfiguration } from '../actions/configurator.action';

@Injectable()
export class ConfiguratorPlaceOrderHookEffects {
  @Effect()
  placeOrder$: Observable<RemoveConfiguration> = this.actions$.pipe(
    ofType(PLACE_ORDER),
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
