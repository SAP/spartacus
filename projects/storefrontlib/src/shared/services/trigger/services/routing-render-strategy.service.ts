import { Injectable } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { TriggerUrlMapping } from '../config';

@Injectable({ providedIn: 'root' })
export class RoutingRenderService {
  constructor(protected routingService: RoutingService) {}

  public render(config: TriggerUrlMapping) {
    this.routingService.go(config);
  }
}
