import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BootstrapModule } from '../../../bootstrap.module';
/* Components */
import { StarRatingComponent } from './star-rating/star-rating.component';
import { ItemCounterComponent } from './item-counter/item-counter.component';
import { OnlyNumberDirective } from './../../directives/only-number/only-number.directive';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, BootstrapModule],
  declarations: [
    StarRatingComponent,
    ItemCounterComponent,
    OnlyNumberDirective
  ],
  exports: [StarRatingComponent, ItemCounterComponent]
})
export class FormComponentsModule {}
