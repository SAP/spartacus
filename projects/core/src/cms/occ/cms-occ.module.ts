import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ComponentMapperService } from '../services/component-mapper.service';

import { OccCmsService } from './occ-cms.service';
import { CmsLoader } from '../services/cms.loader';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    OccCmsService,
    ComponentMapperService,
    {
      provide: CmsLoader,
      useClass: OccCmsService
    }
  ]
})
export class CmsOccModule {}
