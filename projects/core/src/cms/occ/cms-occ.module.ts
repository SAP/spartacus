import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CmsPageAdapter } from '../connectors/page/cms-page.adapter';
import { ComponentMapperService } from '../services/component-mapper.service';
import { OccCmsComponentAdapter } from './occ-cms-component.adapter';
import { OccCmsPageNormalizer } from './converters/occ-cms-page-normalizer';
import { OccCmsPageAdapter } from './occ-cms-page.adapter';
import { CMS_PAGE_NORMALIZE } from '../connectors/page/converters';
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
      provide: CMS_PAGE_NORMALIZE,
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
