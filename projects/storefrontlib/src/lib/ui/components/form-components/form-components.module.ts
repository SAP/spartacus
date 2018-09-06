import { MaterialModule } from './../../../material.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbRatingModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
/* Components */
import { StarRatingComponent } from './star-rating/star-rating.component';
import { ItemCounterComponent } from './item-counter/item-counter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgbRatingModule
  ],
  declarations: [StarRatingComponent, ItemCounterComponent],
  exports: [StarRatingComponent, ItemCounterComponent],
  providers: [NgbRatingConfig]
})
export class FormComponentsModule {}
