import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthModule } from './auth';
import { RoutingModule } from './routing';
import { OccModule } from './occ';
import { SiteContextModule } from './site-context';
import { CmsLibModule } from './cms-lib';
import { CmsModule } from './cms';
import { UiModule, UiFrameworkModule } from './ui';

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
  exports: [],
  declarations: [],
  providers: [{ provide: 'APP_CONFIG', useValue: {} }]
})
export class StorefrontModule {
  static withConfig(config?: any): ModuleWithProviders {
    return {
      ngModule: CmsModule,
      providers: [{ provide: 'APP_CONFIG', useValue: config }]
    };
  }
}
