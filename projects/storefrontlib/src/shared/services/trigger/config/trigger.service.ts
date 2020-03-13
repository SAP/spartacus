import {
  Injectable,
  ComponentFactory,
  ComponentFactoryResolver,
} from '@angular/core';
import {
  TriggerOutletMapping,
  TriggerInlineMapping,
  TriggerUrlMapping,
  TriggerConfig,
  TRIGGER_CALLER,
  TriggerMapping,
} from './trigger-config';
import { OutletService } from '../../../../cms-structure/outlet/index';

@Injectable({ providedIn: 'root' })
export class TriggerService {
  // Keep a list of rendered elements
  protected renderedCallers: TRIGGER_CALLER[] = [];

  constructor(
    protected outletService: OutletService<ComponentFactory<any>>,
    protected triggerConfig: TriggerConfig,
    protected componentFactoryResolver: ComponentFactoryResolver
  ) {}

  renderDialog(caller: TRIGGER_CALLER, component?: any): void | string {
    const config = this.findConfiguration(caller);
    if (Boolean((config as TriggerUrlMapping).url)) {
      this.renderedCallers.push(caller);
      return (config as TriggerUrlMapping).url;
    } else if (
      this.shouldRender(caller, config as TriggerMapping) &&
      component
    ) {
      const template = this.componentFactoryResolver.resolveComponentFactory(
        component
      );
      if (Boolean((config as TriggerOutletMapping).outlet)) {
        this.renderOutlet(config as TriggerOutletMapping, template);
      } else if (Boolean((config as TriggerInlineMapping).inline)) {
        this.renderInline(config as TriggerInlineMapping, template);
      }
      this.renderedCallers.push(caller);
    }
  }

  removeElement(caller: TRIGGER_CALLER): void {
    this.renderedCallers = this.renderedCallers.filter(el => el === caller);
  }

  protected shouldRender(
    caller: TRIGGER_CALLER,
    config: TriggerMapping
  ): boolean {
    return this.renderedCallers.includes(caller) ? !!config.multi : true;
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

  private findConfiguration(
    caller: TRIGGER_CALLER
  ): TriggerOutletMapping | TriggerInlineMapping | TriggerUrlMapping {
    return this.triggerConfig?.trigger[caller];
  }
}
