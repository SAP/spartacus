import { NgModule } from '@angular/core';
import {
  AnonymousConsentsModule,
  AuthModule,
  CartModule,
  CheckoutModule,
  CmsModule,
  ConfigInitializerModule,
  ConfigModule,
  ConfigValidatorModule,
  FeaturesConfigModule,
  GlobalMessageModule,
  I18nModule,
  ProcessModule,
  ProductModule,
  provideConfigFromMetaTags,
  StateModule,
  UserModule,
} from '@spartacus/core';
import { EventsModule } from '../events/events.module';
import { LayoutModule } from '../layout/layout.module';
import { MediaModule } from '../shared/components/media/media.module';
import { ViewConfigModule } from '../shared/config/view-config.module';
import { RoutingModule } from '../cms-structure/routing/routing.module';

@NgModule({
  imports: [
    StateModule.forRoot(),
    AuthModule.forRoot(),
    AnonymousConsentsModule.forRoot(),
    ConfigModule.forRoot(),
    ConfigInitializerModule.forRoot(),
    ConfigValidatorModule.forRoot(),
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
    FeaturesConfigModule.forRoot('2.0'),
    LayoutModule,
    MediaModule.forRoot(),
    EventsModule,
  ],
  exports: [LayoutModule],
  providers: [...provideConfigFromMetaTags()],
})
export class StorefrontFoundationModule {}
