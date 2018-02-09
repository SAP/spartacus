import { OccProductService } from './product/product.service';
import { OccProductSearchService } from './product/product-search.service';
import { OccSiteService } from './site-context/occ-site.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './config.service';
import { HttpClientModule } from '@angular/common/http';
import { OccUserService } from '../newocc/user.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    OccProductSearchService,
    OccProductService,
    OccSiteService,
    OccUserService
  ]
})
export class NewOccModule {
  static forRoot(config: any): any {
    return {
      ngModule: NewOccModule,
      providers: [
        {
          provide: ConfigService,
          useExisting: config
        }
      ]
    };
  }
}
