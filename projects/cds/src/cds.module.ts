import { NgModule } from '@angular/core';
import { CmsStructureConfig, Config, ConfigModule } from '@spartacus/core';
import { MerchandisingCarouselModule } from './components/merchandising-carousel/merchandising-carousel.module';
import { CdsConfig } from './config/config.model';
import { mockComponents, mockSlotConfig } from './mock';

export function mockCms(): CmsStructureConfig {
  return {
    cmsStructure: {
      slots: {
        ...mockSlotConfig,
      },
      components: {
        ...mockComponents,
      },
    },
  };
}

@NgModule({
  imports: [
    ConfigModule.withConfigFactory(mockCms),
    MerchandisingCarouselModule,
  ],
  providers: [
    { provide: CdsConfig, useExisting: Config },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: CdsConsentReferenceInterceptor,
    //   multi: true,
    // },
  ],
})
export class CdsModule {}
