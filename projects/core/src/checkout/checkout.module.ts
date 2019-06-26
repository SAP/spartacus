import { ModuleWithProviders, NgModule } from '@angular/core';
import { PageMetaResolver } from '../cms/index';
import { CheckoutService } from './facade/index';
import { CheckoutPageMetaResolver } from './services/checkout-page-meta.resolver';
import { CheckoutStoreModule } from './store/checkout-store.module';

@NgModule({
  imports: [CheckoutStoreModule],
})
export class CheckoutModule {
  static forRoot(): ModuleWithProviders<CheckoutModule> {
    return {
      ngModule: CheckoutModule,
      providers: [
        CheckoutService,
        {
          provide: PageMetaResolver,
          useExisting: CheckoutPageMetaResolver,
          multi: true,
        },
      ],
    };
  }
}
