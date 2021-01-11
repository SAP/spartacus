import { ModuleWithProviders, NgModule } from '@angular/core';
import { StateModule } from './state/state.module';
import { ConfigInitializerModule } from './config/config-initializer/config-initializer.module';
import { ConfigModule } from './config/config.module';
import { ConfigValidatorModule } from './config/config-validator/config-validator.module';
import { I18nModule } from './i18n/i18n.module';
import { CmsModule } from './cms/cms.module';
import { GlobalMessageModule } from './global-message/global-message.module';
import { ProcessModule } from './process/process.module';
import { FeaturesConfigModule } from './features-config/features-config.module';
import { SiteContextModule } from './site-context/site-context.module';
import { OccModule } from './occ/occ.module';
import { MetaTagConfigModule } from './occ/config/meta-tag-config.module';

@NgModule({
  imports: [
    StateModule.forRoot(),
    ConfigModule.forRoot(),
    ConfigInitializerModule.forRoot(),
    ConfigValidatorModule.forRoot(),
    I18nModule.forRoot(),
    CmsModule.forRoot(),
    GlobalMessageModule.forRoot(),
    ProcessModule.forRoot(),
    FeaturesConfigModule.forRoot(),
    SiteContextModule.forRoot(), // should be imported after RouterModule.forRoot, because it overwrites UrlSerializer
    OccModule.forRoot(),
    MetaTagConfigModule.forRoot(),
  ],
})
export class BaseCoreModule {
  static forRoot(): ModuleWithProviders<BaseCoreModule> {
    return {
      ngModule: BaseCoreModule,
    };
  }
}
