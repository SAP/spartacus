import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from 'projects/storefrontlib/src/cms-components/misc/index';
import { StarRatingComponent } from './star-rating.component';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [StarRatingComponent],
  exports: [StarRatingComponent],
})
export class StarRatingModule {}
