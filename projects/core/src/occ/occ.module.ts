import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideConfigValidator } from '../config/config-validator/config-validator';
import { provideDefaultConfig } from '../config/config.module';
import { OccConfigLoaderModule } from './config-loader/occ-config-loader.module';
import { defaultOccConfig } from './config/default-occ-config';
import { occConfigValidator } from './config/occ-config-validator';
import { WithCredentialsInterceptor } from './interceptors/with-credentials.interceptor';
import { AsmOccModule } from './adapters/asm/asm-occ.module';
import { CmsOccModule } from './adapters/cms';
import { CartOccModule } from './adapters/cart';
import { CheckoutOccModule } from './adapters/checkout';
import { ProductOccModule } from './adapters/product';
import { SiteContextOccModule } from './adapters/site-context';
import { StoreFinderOccModule } from './adapters/store-finder';
import { UserOccModule } from './adapters/user';

@NgModule({
  imports: [
    AsmOccModule,
    CmsOccModule,
    CartOccModule,
    CheckoutOccModule,
    ProductOccModule,
    SiteContextOccModule,
    StoreFinderOccModule,
    UserOccModule,
    OccConfigLoaderModule.forRoot(),
  ],
})
export class OccModule {
  static forRoot(): ModuleWithProviders<OccModule> {
    return {
      ngModule: OccModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useExisting: WithCredentialsInterceptor,
          multi: true,
        },
        provideDefaultConfig(defaultOccConfig),
        provideConfigValidator(occConfigValidator),
      ],
    };
  }
}
