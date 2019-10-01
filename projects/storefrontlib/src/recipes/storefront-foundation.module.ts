import { NgModule } from '@angular/core';
import {
  AuthModule,
  CartModule,
  CheckoutModule,
  CmsModule,
  ConfigModule,
  FeaturesConfigModule,
  GlobalMessageModule,
  I18nModule,
  ProcessModule,
  ProductModule,
  provideConfigFromMetaTags,
  StateModule,
  UserModule,
  AsmModule,
} from '@spartacus/core';
import { RoutingModule } from '../cms-structure/routing/routing.module';
import { LayoutModule } from '../layout/layout.module';
import { ViewConfigModule } from '../shared/config/view-config.module';

@NgModule({
  imports: [
    AsmModule.forRoot(),
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
    ViewConfigModule.forRoot(),
    FeaturesConfigModule.forRoot('1.0'),
    LayoutModule,
  ],
  exports: [LayoutModule],
  providers: [...provideConfigFromMetaTags()],
})
export class StorefrontFoundationModule {}
