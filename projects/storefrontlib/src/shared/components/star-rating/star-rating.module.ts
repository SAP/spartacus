import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BootstrapModule } from '../../../lib/bootstrap.module';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, BootstrapModule],
  declarations: [StarRatingComponent],
  exports: [StarRatingComponent],
})
export class StarRatingModule {}
