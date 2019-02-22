import { NgModule } from '@angular/core';
import { CartNotEmptyGuard } from './cart-not-empty.guard';
import { RoutingModule, CartModule } from '@spartacus/core';

@NgModule({
  imports: [RoutingModule, CartModule],
  providers: [CartNotEmptyGuard]
})
export class GuardsModule {}
