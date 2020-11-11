import { NgModule } from '@angular/core';
import { CartItemOutletConfiguratorIssuesModule } from './cart-item-outlet-configurator-issues/cart-item-outlet-configurator-issues.module';
import { CartItemOutletConfiguratorModule } from './cart-item-outlet-configurator/cart-item-outlet-configurator.module';

@NgModule({
  imports: [
    CartItemOutletConfiguratorIssuesModule,
    CartItemOutletConfiguratorModule,
  ],
})
export class CommonConfiguratorOutletComponentsModule {}
