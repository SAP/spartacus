import { ModuleWithProviders, NgModule } from '@angular/core';
import { Config, provideDefaultConfig } from '../config/config.module';
import { CmsConfig } from './config/cms-config';
import { CmsStructureConfig } from './config/cms-structure.config';
import { defaultCmsModuleConfig } from './config/default-cms-config';
import { CmsEventModule } from './event/cms-event.module';
import { CmsService } from './facade/cms.service';
import { CmsPageTitleModule } from './page/page.module';
import { CmsStoreModule } from './store/cms-store.module';

@NgModule({
  imports: [CmsStoreModule, CmsPageTitleModule, CmsEventModule],
})
export class CmsModule {
  static forRoot(): ModuleWithProviders<CmsModule> {
    return {
      ngModule: CmsModule,
      providers: [
        CmsService,
        { provide: CmsConfig, useExisting: Config },
        { provide: CmsStructureConfig, useExisting: Config },
        provideDefaultConfig(defaultCmsModuleConfig),
      ],
    };
  }
}
