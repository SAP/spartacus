import { Injectable } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { LaunchRoute, TRIGGER_CALLER } from '../config/index';
import { LaunchRenderStrategy } from './launch-render.strategy';

@Injectable({ providedIn: 'root' })
export class RoutingRenderStrategy extends LaunchRenderStrategy {
  constructor(protected routingService: RoutingService) {
    super();
  }
  /**
   * Navigates to the route configured for the caller
   *
   * @param config
   * @param _caller
   */
  render(config: LaunchRoute, _caller: TRIGGER_CALLER) {
    this.routingService.go(config);
  }

  match(config: LaunchRoute) {
    return Boolean(config.cxRoute);
  }
}
