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
  provideConfigFromMetaTags,
  StateModule,
  UserModule,
} from '@spartacus/core';
import { RoutingModule } from '../cms-structure/routing/routing.module';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  imports: [
    StateModule,
    AuthModule.forRoot(),
    ConfigModule.forRoot(),
    RoutingModule,
    I18nModule.forRoot(),
    CmsModule,
    GlobalMessageModule.forRoot(),
    ProcessModule,
    CartModule,
    CheckoutModule,
    UserModule,

    LayoutModule,
  ],
  providers: [...provideConfigFromMetaTags()],
})
export class StorefrontFoundationModule {}
