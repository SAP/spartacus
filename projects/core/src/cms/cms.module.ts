import { ModuleWithProviders, NgModule } from '@angular/core';
import { Config, provideConfig } from '../config/index';
import { CmsStructureConfig } from './config/cms-structure.config';
import { CmsConfig, defaultCmsModuleConfig } from './config/index';
import { CmsService } from './facade/index';
import { CmsPageTitleModule } from './page/page.module';
import { CmsStoreModule } from './store/cms-store.module';

@NgModule({
  imports: [CmsStoreModule, CmsPageTitleModule],
})
export class CmsModule {
  static forRoot(): ModuleWithProviders<CmsModule> {
    return {
      ngModule: CmsModule,
      providers: [
        CmsService,
        { provide: CmsConfig, useExisting: Config },
        { provide: CmsStructureConfig, useExisting: Config },
        provideConfig(defaultCmsModuleConfig),
      ],
    };
  }
}
