import { NgModule } from '@angular/core';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  providers: [...facadeProviders],
})
export class PickupInStoreCoreModule {}
