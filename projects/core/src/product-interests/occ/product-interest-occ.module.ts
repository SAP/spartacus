import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { OccModule } from '../../occ/occ.module';
import { OccProductInterestsService } from './product-interest.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, OccModule],
  providers: [OccProductInterestsService],
})
export class ProductInterestOccModule {}
