import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { ItemCounterComponent } from './item-counter.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, I18nModule],
  declarations: [ItemCounterComponent],
  exports: [ItemCounterComponent],
})
export class ItemCounterModule {}
