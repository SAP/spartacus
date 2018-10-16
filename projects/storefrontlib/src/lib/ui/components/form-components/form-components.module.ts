import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BootstrapModule } from '../../../bootstrap.module';
/* Components */
import { StarRatingComponent } from './star-rating/star-rating.component';
import { ItemCounterComponent } from './item-counter/item-counter.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, BootstrapModule],
  declarations: [StarRatingComponent, ItemCounterComponent],
  exports: [StarRatingComponent, ItemCounterComponent]
})
export class FormComponentsModule {}
