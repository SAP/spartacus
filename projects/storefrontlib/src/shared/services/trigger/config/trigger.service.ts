import { Injectable, ComponentFactory } from '@angular/core';
import {
  TriggerOutletMapping,
  TriggerInlineMapping,
  TriggerUrlMapping,
  TriggerConfig,
  TRIGGER_CALLER,
} from './trigger-config';
import { OutletService } from '../../../../cms-structure/outlet/index';

@Injectable({ providedIn: 'root' })
export class TriggerService {
  constructor(
    protected outletService: OutletService<ComponentFactory<any>>,
    protected triggerConfig: TriggerConfig
  ) {}

  renderDialog(
    caller: TRIGGER_CALLER,
    template?: ComponentFactory<any>
  ): void | string {
    const config = this.findMapping(caller);
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

  private findMapping(
    caller: TRIGGER_CALLER
  ): TriggerOutletMapping | TriggerInlineMapping | TriggerUrlMapping {
    return this.triggerConfig?.trigger[caller];
  }
}
