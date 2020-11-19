import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItemActiveDirective } from './item-active.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ItemActiveDirective],
  exports: [ItemActiveDirective],
})
export class ItemActiveModule {}
