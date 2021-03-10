import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItemExistsDirective } from './item-exists.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ItemExistsDirective],
  exports: [ItemExistsDirective],
})
export class ItemExistsModule {}
