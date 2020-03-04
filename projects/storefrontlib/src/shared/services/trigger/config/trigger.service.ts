import { Injectable, ComponentFactory } from '@angular/core';
import {
  TriggerOutletMapping,
  TriggerInlineMapping,
  TriggerUrlMapping,
} from './trigger-config';
import { OutletService } from '../../../../cms-structure/outlet/index';

@Injectable({ providedIn: 'root' })
export class TriggerService {
  constructor(protected outletService: OutletService<ComponentFactory<any>>) {}

  renderDialog(
    config: TriggerOutletMapping | TriggerInlineMapping | TriggerUrlMapping,
    template?: ComponentFactory<any>
  ) {
    if (typeof config === 'string') {
      // TODO: add link
    } else if (Boolean((config as TriggerOutletMapping).outlet)) {
      const conf = config as TriggerOutletMapping;
      this.outletService.add(conf.outlet, template, conf.position);
    } else if (Boolean((config as TriggerInlineMapping).inline)) {
      // TODO: Inline rendering
    }
  }
}
