import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuickOrderModule } from './quick-order/quick-order.module';

@NgModule({
  imports: [RouterModule, QuickOrderModule],
})
export class QuickOrderComponentsModule {}
