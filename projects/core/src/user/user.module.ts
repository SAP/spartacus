import { ModuleWithProviders, NgModule } from '@angular/core';
import { PageMetaResolver } from '../cms/page/page-meta.resolver';
import { OrderPageMetaResolver } from './services/order-page-meta.resolver';
import { UserStoreModule } from './store/user-store.module';

/**
 * @deprecated since 3.2, moved to the `@spartacus/user` package.
 */
@NgModule({
  imports: [UserStoreModule],
})
export class UserModule {
  static forRoot(): ModuleWithProviders<UserModule> {
    return {
      ngModule: UserModule,
      providers: [
        {
          provide: PageMetaResolver,
          useExisting: OrderPageMetaResolver,
          multi: true,
        },
      ],
    };
  }
}
