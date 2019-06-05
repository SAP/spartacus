import { NgModule } from '@angular/core';
import {
  AuthModule,
  ConfigModule,
  I18nModule,
  provideConfigFromMetaTags,
  SiteContextModule,
  StateModule,
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

    SiteContextModule.forRoot(),

    LayoutModule,
  ],
  // move this to foundation
  providers: [...provideConfigFromMetaTags()],
})
export class StorefrontFoundationModule {}
