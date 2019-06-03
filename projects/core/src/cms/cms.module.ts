import { NgModule } from '@angular/core';
import { Config, ConfigModule } from '../config/index';
import { CmsStructureConfig } from './config/cms-structure.config';
import { CmsConfig, defaultCmsModuleConfig } from './config/index';
import { CmsService } from './facade/index';
import { CmsPageTitleModule } from './page/page.module';
import { CmsStoreModule } from './store/cms-store.module';

@NgModule({
  imports: [
    CmsStoreModule,
    ConfigModule.withConfig(defaultCmsModuleConfig),
    CmsPageTitleModule,
  ],
  providers: [
    CmsService,
    { provide: CmsConfig, useExisting: Config },
    { provide: CmsStructureConfig, useExisting: Config },
  ],
})
export class CmsModule {}
