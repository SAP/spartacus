import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnlyNumberDirective } from '../../directives/only-number/only-number.directive';
import { ItemCounterComponent } from './item-counter/item-counter.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [ItemCounterComponent, OnlyNumberDirective],
  exports: [ItemCounterComponent],
})
export class FormComponentsModule {}
