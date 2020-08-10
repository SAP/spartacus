import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideConfigValidator } from '../config/config-validator/config-validator';
import { provideDefaultConfig } from '../config/config.module';
// import { AsmOccModule } from '@spartacus/my-account/organization/src/core/occ/adapters/asm/asm-occ.module';
// import { CartOccModule } from '@spartacus/my-account/organization/src/core/occ/adapters/cart/cart-occ.module';
// import { CheckoutOccModule } from '@spartacus/my-account/organization/src/core/occ/adapters/checkout/checkout-occ.module';
// import { CmsOccModule } from '@spartacus/my-account/organization/src/core/occ/adapters/cms/cms-occ.module';
// import { ProductOccModule } from '@spartacus/my-account/organization/src/core/occ/adapters/product/product-occ.module';
// import { SiteContextOccModule } from '@spartacus/my-account/organization/src/core/occ/adapters/site-context/site-context-occ.module';
// import { StoreFinderOccModule } from '@spartacus/my-account/organization/src/core/occ/adapters/store-finder/store-finder-occ.module';
// import { UserOccModule } from '@spartacus/my-account/organization/src/core/occ/adapters/user/user-occ.module';
import { OccConfigLoaderModule } from './config-loader/occ-config-loader.module';
// import { OrganizationOccModule } from '@spartacus/my-account/organization/src/core/occ/adapters/organization/organization-occ.module';
import { defaultOccConfig } from './config/default-occ-config';
import { occConfigValidator } from './config/occ-config-validator';
import { WithCredentialsInterceptor } from './interceptors/with-credentials.interceptor';

@NgModule({
  imports: [
    // AsmOccModule,
    // CmsOccModule,
    // CartOccModule,
    // CheckoutOccModule,
    // ProductOccModule,
    // SiteContextOccModule,
    // StoreFinderOccModule,
    // UserOccModule,
    OccConfigLoaderModule.forRoot(),
    // OrganizationOccModule,
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
