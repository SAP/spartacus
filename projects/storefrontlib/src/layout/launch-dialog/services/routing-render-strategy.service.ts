import { Injectable, RendererFactory2 } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { LaunchRoute, LAUNCH_CALLER } from '../config/index';
import { LaunchRenderStrategy } from './launch-render.strategy';

@Injectable({ providedIn: 'root' })
export class RoutingRenderStrategy extends LaunchRenderStrategy {
  constructor(
    protected rendererFactory: RendererFactory2,
    protected routingService: RoutingService
  ) {
    super(rendererFactory);
  }
  /**
   * Navigates to the route configured for the caller
   */
  render(config: LaunchRoute, _caller: LAUNCH_CALLER) {
    this.routingService.go(config);
  }

  match(config: LaunchRoute) {
    return Boolean(config.cxRoute);
  }
}
