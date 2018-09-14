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
    AuthModule.forRoot(),
    RoutingModule.forRoot(),
    OccModule.forRoot(),
    SiteContextModule.forRoot(),
    CmsLibModule,
    CmsModule.forRoot(),
    UiModule,
    UiFrameworkModule
  ],
  exports: [UiModule],
  declarations: [],
  providers: [{ provide: 'APP_CONFIG', useValue: {} }]
})
export class StorefrontModule {
  static withConfig(config?: any): ModuleWithProviders {
    return {
      ngModule: StorefrontModule,
      providers: [{ provide: 'APP_CONFIG', useValue: config }]
    };
  }
}
