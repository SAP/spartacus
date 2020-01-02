import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Config, provideConfig, provideConfigValidator } from '@spartacus/core';
import {
  CdsConfig,
  cdsConfigValidator,
  DEFAULT_CDS_CONFIG,
} from './config/index';
import { CdsConsentReferenceInterceptor } from './http-interceptors/cds-consent-reference-interceptor';
import { MerchandisingModule } from './merchandising/merchandising.module';
import { ProfileTagModule } from './profiletag/profile-tag.module';

@NgModule({
  imports: [ProfileTagModule, MerchandisingModule.forRoot()],
})
export class CdsModule {
  static forRoot(config: CdsConfig): ModuleWithProviders<CdsModule> {
    return {
      ngModule: CdsModule,
      providers: [
        provideConfig(DEFAULT_CDS_CONFIG),
        provideConfig(config),
        provideConfigValidator(cdsConfigValidator),
        { provide: CdsConfig, useExisting: Config },
        {
          provide: HTTP_INTERCEPTORS,
          useExisting: CdsConsentReferenceInterceptor,
          multi: true,
        },
      ],
    };
  }
}
