import { ModuleWithProviders, NgModule } from '@angular/core';
import { defaultCmsModuleConfig } from './config/default-cms-config';
import { CmsService } from './facade/cms.service';
import { CmsPageTitleModule } from './page/page.module';
import { CmsStoreModule } from './store/cms-store.module';
import { provideDefaultConfig } from '../config/config-providers';

@NgModule({
  imports: [CmsStoreModule, CmsPageTitleModule],
})
export class CmsModule {
  static forRoot(): ModuleWithProviders<CmsModule> {
    return {
      ngModule: CmsModule,
      providers: [CmsService, provideDefaultConfig(defaultCmsModuleConfig)],
    };
  }
}
