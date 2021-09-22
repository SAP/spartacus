import { NgModule } from '@angular/core';
import { CartPersistenceModule } from './cart-persistence.module';
import { CartConnector } from './connectors/cart/cart.connector';
import { CartEntryConnector } from './connectors/entry/cart-entry.connector';
import { SaveCartConnector } from './connectors/save-cart/save-cart.connecter';
import { CartVoucherConnector } from './connectors/voucher/cart-voucher.connector';
import { CartEventModule } from './event/cart-event.module';
import { facadeProviders } from './facade/facade-providers';
import { MultiCartStoreModule } from './store/multi-cart-store.module';

@NgModule({
  imports: [MultiCartStoreModule, CartEventModule, CartPersistenceModule],
  providers: [
    CartConnector,
    CartEntryConnector,
    SaveCartConnector,
    CartVoucherConnector,
    ...facadeProviders,
  ],
})
export class CartCoreModule {}
