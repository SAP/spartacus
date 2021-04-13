import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuickOrderWrapperModule } from './wrapper/quick-order-wrapper.module';

@NgModule({
  imports: [RouterModule, QuickOrderWrapperModule],
})
export class QuickOrderComponentsModule {}
