import { NgModule } from '@angular/core';
import { CartValidationConnector } from './connectors/cart-validation.connector';
import { facadeProviders } from './facade/facade-providers';
import { CartValidationWarningsStateService } from './services/cart-validation-warnings-state.service';

@NgModule({
  providers: [
    CartValidationConnector,
    ...facadeProviders,
    CartValidationWarningsStateService,
  ],
})
export class CartValidationCoreModule {}
