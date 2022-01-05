import { Injectable } from '@angular/core';
import { EventService } from '@spartacus/core';
import {
  ConfiguratorCartService,
  RulebasedConfiguratorEventListener,
} from '@spartacus/product-configurator/rulebased';

@Injectable({ providedIn: 'root' })
export class CustomEventListener extends RulebasedConfiguratorEventListener {
  constructor(
    protected configuratorCartService: ConfiguratorCartService,
    protected eventService: EventService
  ) {
    super(configuratorCartService, eventService);
  }
}
