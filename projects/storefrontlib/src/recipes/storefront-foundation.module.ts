import { NgModule } from '@angular/core';
import {
  AuthModule,
  CartModule,
  CheckoutModule,
  CmsModule,
  ConfigModule,
  GlobalMessageModule,
  I18nModule,
  ProcessModule,
  ProductModule,
  provideConfigFromMetaTags,
  StateModule,
  UserModule,
} from '@spartacus/core';
import { RoutingModule } from '../cms-structure/routing/routing.module';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  imports: [
    StateModule.forRoot(),
    AuthModule.forRoot(),
    ConfigModule.forRoot(),
    RoutingModule.forRoot(),
    I18nModule.forRoot(),
    CmsModule.forRoot(),
    GlobalMessageModule.forRoot(),
    ProcessModule.forRoot(),
    CartModule.forRoot(),
    CheckoutModule.forRoot(),
    UserModule.forRoot(),
    ProductModule.forRoot(),

    LayoutModule,
  ],
  exports: [LayoutModule],
  providers: [...provideConfigFromMetaTags()],
})
export class StorefrontFoundationModule {}
