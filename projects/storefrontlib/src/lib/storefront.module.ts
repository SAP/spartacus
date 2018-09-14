import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthModule } from './auth/index';
import { RoutingModule } from './routing/index';
import { OccModule } from './occ/index';
import { SiteContextModule } from './site-context/index';
import { CmsLibModule } from './cms-lib/index';
import { CmsModule } from './cms/index';
import { UiModule, UiFrameworkModule } from './ui/index';

@NgModule({
  imports: [
    AuthModule,
    RoutingModule,
    OccModule,
    SiteContextModule,
    CmsLibModule,
    CmsModule,
    UiModule,
    UiFrameworkModule,
    ConfigModule.forRoot()
  ],
  exports: [UiModule],
  declarations: []
})
export class StorefrontModule {
  static withConfig(config?: StorefrontConfig): ModuleWithProviders {
    return {
      ngModule: StorefrontModule,
      providers: [ provideConfig(config) ]
    };
  }
}
