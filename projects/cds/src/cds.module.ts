import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Config, ConfigModule } from '@spartacus/core';
import { MerchandisingCarouselModule } from './components/merchandising-carousel/merchandising-carousel.module';
import { CdsConfig } from './config/config.model';
import { CdsConsentReferenceInterceptor } from './interceptors/consent-ref.interceptor';

@NgModule({
  imports: [ConfigModule, MerchandisingCarouselModule],
  providers: [
    { provide: CdsConfig, useExisting: Config },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CdsConsentReferenceInterceptor,
      multi: true,
    },
  ],
})
export class CdsModule {}
