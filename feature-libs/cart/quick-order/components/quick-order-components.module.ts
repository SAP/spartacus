import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuickOrderContainerModule } from './container/quick-order-container.module';

@NgModule({
  imports: [RouterModule, QuickOrderContainerModule],
})
export class QuickOrderComponentsModule {}
