import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SavedCartListModule } from './list/saved-cart-list.module';

@NgModule({
  imports: [RouterModule, SavedCartListModule],
})
export class SavedCartComponentsModule {}
