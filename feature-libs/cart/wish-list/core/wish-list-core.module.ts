import { NgModule } from '@angular/core';
import { facadeProviders } from './facade/facade-providers';
import { WishListStoreModule } from './store/wish-list-store.module';

@NgModule({
  imports: [WishListStoreModule],
  providers: [...facadeProviders],
})
export class WishListCoreModule {}
