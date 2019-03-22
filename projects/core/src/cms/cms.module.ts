import { NgModule } from '@angular/core';

import { CmsService } from './facade/index';
import { CmsStoreModule } from './store/cms-store.module';
import { CmsOccModule } from './occ/cms-occ.module';
import { CmsPageTitleModule } from './page/page.module';

import { CmsStructureConfig } from './config/cms-structure.config';
import { Config } from '../config/index';
import { Adapter } from './adapters';
import { OccCmsAdapter } from './adapters/occ.adapter';

@NgModule({
  imports: [CmsOccModule, CmsStoreModule, CmsPageTitleModule],
  providers: [
    CmsService,
    {
      provide: Adapter,
      useClass: OccCmsAdapter
    },
    { provide: CmsStructureConfig, useExisting: Config }
  ]
})
export class CmsModule {}
