import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { CmsComponentAdapter } from '../../../cms/connectors/component/cms-component.adapter';
import { CmsPageAdapter } from '../../../cms/connectors/page/cms-page.adapter';
import { CMS_PAGE_NORMALIZER } from '../../../cms/connectors/page/converters';
import { OccCmsPageNormalizer } from './converters/occ-cms-page-normalizer';
import { OccCmsComponentAdapter } from './occ-cms-component.adapter';
import { OccCmsPageAdapter } from './occ-cms-page.adapter';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: CmsPageAdapter,
      useClass: OccCmsPageAdapter,
    },
    {
      provide: CMS_PAGE_NORMALIZER,
      useExisting: OccCmsPageNormalizer,
      multi: true,
    },
    {
      provide: CmsComponentAdapter,
      useClass: OccCmsComponentAdapter,
    },
  ],
})
export class CmsOccModule {}
