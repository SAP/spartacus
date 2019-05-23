import { NgModule } from '@angular/core';

import { CmsService } from './facade/index';
import { CmsStoreModule } from './store/cms-store.module';
import { CmsPageTitleModule } from './page/page.module';

import { CmsStructureConfig } from './config/cms-structure.config';
import { Config } from '../config/index';

@NgModule({
  imports: [CmsStoreModule, CmsPageTitleModule],
  providers: [CmsService, { provide: CmsStructureConfig, useExisting: Config }],
})
export class CmsModule {}
