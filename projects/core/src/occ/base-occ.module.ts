import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideConfigValidator } from '../config/config-validator/config-validator';
import { defaultOccConfig } from './config/default-occ-config';
import { occConfigValidator } from './config/occ-config-validator';
import { WithCredentialsInterceptor } from './interceptors/with-credentials.interceptor';
import { CmsOccModule } from './adapters/cms/cms-occ.module';
import { SiteContextOccModule } from './adapters/site-context/site-context-occ.module';
import { provideDefaultConfig } from '../config/config-providers';

import { OCC_USER_ID_CONSTANTS, OCC_USER_IDS } from './utils';

@NgModule({
  imports: [CmsOccModule, SiteContextOccModule],
})
export class BaseOccModule {
  static forRoot(): ModuleWithProviders<BaseOccModule> {
    return {
      ngModule: BaseOccModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useExisting: WithCredentialsInterceptor,
          multi: true,
        },
        {
          provide: OCC_USER_ID_CONSTANTS,
          useValue: OCC_USER_IDS,
        },
        provideDefaultConfig(defaultOccConfig),
        provideConfigValidator(occConfigValidator),
      ],
    };
  }
}
