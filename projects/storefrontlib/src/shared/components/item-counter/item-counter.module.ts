import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemCounterComponent } from './item-counter.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [ItemCounterComponent],
  exports: [ItemCounterComponent],
})
export class ItemCounterModule {}
