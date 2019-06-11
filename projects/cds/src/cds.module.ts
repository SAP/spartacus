import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Config, ConfigModule, provideConfigValidator } from '@spartacus/core';
import { MerchandisingCarouselModule } from './components/merchandising-carousel/merchandising-carousel.module';
import { ProfileTagModule } from './components/profile-tag/profile-tag.module';
import { cdsConfigValidator } from './config/cds-config-validator';
import { CdsConfig } from './config/config.model';
import { defaultCdsConfig } from './config/default-config';
import { CdsConsentReferenceInterceptor } from './interceptors/consent-ref.interceptor';

// export function mockCms(): CmsStructureConfig {
//   return {
//     cmsStructure: {
//       slots: {
//         ...mockSlotConfig,
//       },
//       components: {
//         ...mockComponents,
//       },
//     },
//   };
// }

@NgModule({
  imports: [
    ConfigModule.withConfig(defaultCdsConfig),
    // ConfigModule.withConfigFactory(mockCms),
    ProfileTagModule,
    MerchandisingCarouselModule,
  ],
  providers: [
    { provide: CdsConfig, useExisting: Config },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CdsConsentReferenceInterceptor,
      multi: true,
    },
    provideConfigValidator(cdsConfigValidator),
  ],
})
export class CdsModule {}
