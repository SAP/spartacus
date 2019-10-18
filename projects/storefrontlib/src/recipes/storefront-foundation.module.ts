import { NgModule } from '@angular/core';
import {
  AsmModule,
  AuthModule,
  CartModule,
  CheckoutModule,
  CmsModule,
  ConfigModule,
  ConfiguratorCommonsModule,
  ConfiguratorTextfieldModule,
  FeaturesConfigModule,
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
    ConfiguratorCommonsModule.forRoot(),
    ConfiguratorTextfieldModule.forRoot(),
  ],
  exports: [LayoutModule],
  providers: [...provideConfigFromMetaTags()],
})
export class StorefrontFoundationModule {}
