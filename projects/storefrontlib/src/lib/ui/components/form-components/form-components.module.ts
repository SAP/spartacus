import { MaterialModule } from './../../../material.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/* Components */
import { StarRatingComponent } from './star-rating/star-rating.component';
import { ItemCounterComponent } from './item-counter/item-counter.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  declarations: [StarRatingComponent, ItemCounterComponent],
  exports: [StarRatingComponent, ItemCounterComponent]
})
export class FormComponentsModule {}
