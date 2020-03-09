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
  ): void | string {
    if (Boolean((config as TriggerUrlMapping).url)) {
      return (config as TriggerUrlMapping).url;
    } else if (Boolean((config as TriggerOutletMapping).outlet)) {
      this.renderOutlet(config as TriggerOutletMapping, template);
    } else if (Boolean((config as TriggerInlineMapping).inline)) {
      this.renderInline(config as TriggerInlineMapping, template);
    }
  }

  protected renderOutlet(
    config: TriggerOutletMapping,
    template?: ComponentFactory<any>
  ) {
    this.outletService.add(config.outlet, template, config.position);
  }

  protected renderInline(
    config: TriggerInlineMapping,
    template?: ComponentFactory<any>
  ) {
    this.outletService.add('cx-storefront', template, config.position);
  }
}
