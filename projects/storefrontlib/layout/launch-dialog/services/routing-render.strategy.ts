import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, RendererFactory2 } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { LaunchRoute, LAUNCH_CALLER } from '../config/index';
import { LaunchRenderStrategy } from './launch-render.strategy';

@Injectable({ providedIn: 'root' })
export class RoutingRenderStrategy extends LaunchRenderStrategy {
  constructor(
    @Inject(DOCUMENT) protected document: any,
    protected rendererFactory: RendererFactory2,
    protected routingService: RoutingService
  ) {
    super(document, rendererFactory);
  }
  /**
   * Navigates to the route configured for the caller
   */
  render(config: LaunchRoute, _caller: LAUNCH_CALLER | string) {
    this.routingService.go(config);
  }

  hasMatch(config: LaunchRoute) {
    return Boolean(config.cxRoute);
  }
}
