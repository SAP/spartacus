import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { OccProductService } from './product.service';
import { OccProductSearchService } from './product-search.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    OccProductService,
    OccProductSearchService
  ]
})
export class SiteContextOccModule {}
