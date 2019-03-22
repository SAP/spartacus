import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ComponentMapperService } from '../services/component-mapper.service';

import { OccCmsPageLoader } from './occ-cms-page.loader';
import { CmsPageLoader } from '../services/cms-page.loader';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    OccCmsPageLoader,
    ComponentMapperService,
    {
      provide: CmsPageLoader,
      useClass: OccCmsPageLoader
    }
  ]
})
export class CmsOccModule {}
