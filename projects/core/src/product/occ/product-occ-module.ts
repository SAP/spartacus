import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { OccProductService } from './product.service';
import { OccProductSearchService } from './product-search.service';
import { OccModule } from '../../occ/occ.module';

@NgModule({
  imports: [CommonModule, HttpClientModule, OccModule],
  providers: [OccProductService, OccProductSearchService]
})
export class ProductOccModule {}
