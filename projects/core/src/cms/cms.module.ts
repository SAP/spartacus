import { NgModule } from '@angular/core';

import { CmsService } from './facade/index';
import { CmsStoreModule } from './store/cms-store.module';
import { CmsOccModule } from './occ/cms-occ.module';
import { CmsPageTitleModule } from './page/page.module';
import { OccCmsConvertor, populators } from './converter/index';
import { CmsContentConfig } from './config/cms-content.config';
import { Config } from '../config/index';

@NgModule({
  imports: [CmsOccModule, CmsStoreModule, CmsPageTitleModule],
  providers: [
    CmsService,
    OccCmsConvertor,
    ...populators,
    { provide: CmsContentConfig, useExisting: Config }
  ]
})
export class CmsModule {}
