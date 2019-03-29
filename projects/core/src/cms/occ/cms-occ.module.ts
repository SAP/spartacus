import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CmsPageAdapter } from '../services/cms-page.adapter';
import { CmsPageLoader } from '../services/cms-page.loader';
import { ComponentMapperService } from '../services/component-mapper.service';
import { OccCmsPageAdapter } from './occ-cms-page.adapter';
import { OccCmsPageLoader } from './occ-cms-page.loader';
import { CmsComponentLoader } from '../services/cms-component.loader';
import { OccCmsComponentLoader } from './occ-cms-component.loader';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    OccCmsPageLoader,
    ComponentMapperService,
    {
      provide: CmsPageLoader,
      useClass: OccCmsPageLoader,
    },
    {
      provide: CmsComponentLoader,
      useClass: OccCmsComponentLoader
    },
    {
      provide: CmsPageAdapter,
      useClass: OccCmsPageAdapter,
    },
  ],
})
export class CmsOccModule {}
