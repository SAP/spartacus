import { NgModule } from '@angular/core';
import { CartItemOutletConfiguratorIssuesModule } from './outlets/cart-item-outlet-configurator-issues/cart-item-outlet-configurator-issues.module';
import { CartItemOutletConfiguratorModule } from './outlets/cart-item-outlet-configurator/cart-item-outlet-configurator.module';

// Note: should be in separate, eagerly loaded entry point - to register outlet components on app bootstrap
@NgModule({
  imports: [
    CartItemOutletConfiguratorIssuesModule,
    CartItemOutletConfiguratorModule,
  ],
})
export class CommonConfiguratorOutletComponentsModule {}
