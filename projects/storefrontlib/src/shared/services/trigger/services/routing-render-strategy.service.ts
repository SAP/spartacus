import { Injectable } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { TriggerUrlMapping, TRIGGER_CALLER } from '../config/index';
import { RenderStrategy } from './render.strategy';

@Injectable({ providedIn: 'root' })
export class RoutingRenderStrategy extends RenderStrategy {
  constructor(protected routingService: RoutingService) {
    super();
  }

  public render(config: TriggerUrlMapping, _caller: TRIGGER_CALLER) {
    this.routingService.go(config);
  }

  public isStrategyForConfiguration(config: TriggerUrlMapping) {
    return Boolean(config.cxRoute);
  }
}
