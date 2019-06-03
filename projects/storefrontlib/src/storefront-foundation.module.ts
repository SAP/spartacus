import { NgModule } from '@angular/core';
import {
  AuthModule,
  ConfigModule,
  I18nModule,
  StateModule,
} from '@spartacus/core';
import { RoutingModule } from './cms-structure/routing/routing.module';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  imports: [
    StateModule,
    AuthModule.forRoot(),
    ConfigModule.forRoot(),
    RoutingModule,
    I18nModule.forRoot(),

    LayoutModule,
  ],
})
export class StorefrontFoundationModule {}
