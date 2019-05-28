import { NgModule } from '@angular/core';
import {
  ConfigModule,
  RoutingModule as CoreRoutingModule,
} from '@spartacus/core';
import { CmsRouteModule } from './cms-route';
import { defaultRoutingConfig } from './default-routing-config';

@NgModule({
  imports: [
    CoreRoutingModule,
    ConfigModule.withConfig(defaultRoutingConfig),
    CmsRouteModule,
  ],
})
export class RoutingModule {}
