import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideDefaultConfig } from '../config/config-providers';
import { defaultCmsModuleConfig } from './config/default-cms-config';
import { CmsService } from './facade/cms.service';
import { PageModule } from './page/page.module';
import { CmsStoreModule } from './store/cms-store.module';

@NgModule({
  imports: [CmsStoreModule, PageModule.forRoot()],
})
export class CmsModule {
  static forRoot(): ModuleWithProviders<CmsModule> {
    return {
      ngModule: CmsModule,
      providers: [CmsService, provideDefaultConfig(defaultCmsModuleConfig)],
    };
  }
}
