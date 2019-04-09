import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CmsPageAdapter } from '../connectors/page/cms-page.adapter';
import { ComponentMapperService } from '../services/component-mapper.service';
import { OccCmsComponentAdapter } from './occ-cms-component.adapter';
import { OccCmsPageNormalizer } from './occ-cms-page.normalizer';
import { OccCmsPageAdapter } from './occ-cms-page.adapter';
import { CMS_PAGE_NORMALIZER } from '../connectors/page/cms-page.normalizer';
import { CmsComponentAdapter } from '../connectors/component/cms-component.adapter';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    ComponentMapperService,
    {
      provide: CmsPageAdapter,
      useClass: OccCmsPageAdapter,
    },
    {
      provide: CMS_PAGE_NORMALIZER,
      useClass: OccCmsPageNormalizer,
      multi: true,
    },
    {
      provide: CmsComponentAdapter,
      useClass: OccCmsComponentAdapter,
    },
  ],
})
export class CmsOccModule {}
