import { NgModule } from '@angular/core';
import { HttpErrorHandler } from '@spartacus/core';
import { CartPersistenceModule } from './cart-persistence.module';
import { CartConnector } from './connectors/cart/cart.connector';
import { CartEntryConnector } from './connectors/entry/cart-entry.connector';
import { SaveCartConnector } from './connectors/save-cart/save-cart.connecter';
import { CartValidationConnector } from './connectors/validation/cart-validation.connector';
import { CartVoucherConnector } from './connectors/voucher/cart-voucher.connector';
import { CartEventModule } from './event/cart-event.module';
import { facadeProviders } from './facade/facade-providers';
import { BadCartRequestHandler } from './http-interceptors/handlers/bad-cart-request.handler';
import { MultiCartStoreModule } from './store/multi-cart-store.module';

@NgModule({
  imports: [MultiCartStoreModule, CartEventModule, CartPersistenceModule],
  providers: [
    CartConnector,
    CartEntryConnector,
    SaveCartConnector,
    CartVoucherConnector,
    CartValidationConnector,
    ...facadeProviders,
    {
      provide: HttpErrorHandler,
      useExisting: BadCartRequestHandler,
      multi: true,
    },
  ],
})
export class CartCoreModule {}
