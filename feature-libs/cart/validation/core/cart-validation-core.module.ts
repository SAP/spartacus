import { NgModule } from '@angular/core';
import { CartValidationConnector } from './connectors/cart-validation.connector';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  providers: [CartValidationConnector, ...facadeProviders],
})
export class CartValidationCoreModule {}
