import { NgModule } from '@angular/core';
import { ConfiguratorRouterListener } from './configurator-router.listener';

@NgModule({})
export class ConfiguratorRouterModule {
  constructor(_configuratorRouterListener: ConfiguratorRouterListener) {}
}
