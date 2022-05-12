import { NgModule } from '@angular/core';
import { facadeProviders } from './facades/facade-providers';

@NgModule({
  providers: [...facadeProviders],
})
export class PickupInStoreCoreModule {}
