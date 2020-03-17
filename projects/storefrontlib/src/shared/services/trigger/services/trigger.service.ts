import {
  ComponentFactoryResolver,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import {
  TriggerConfig,
  TriggerInlineMapping,
  TriggerMapping,
  TriggerOutletMapping,
  TriggerUrlMapping,
  TRIGGER_CALLER,
} from '../config/trigger-config';
import { InlineRenderService } from './inline-render-strategy.service';
import { OutletRenderService } from './outlet-render-strategy.service';
import { RoutingRenderService } from './routing-render-strategy.service';

@Injectable({ providedIn: 'root' })
export class TriggerService {
  // Keep a list of rendered elements
  protected renderedCallers: TRIGGER_CALLER[] = [];

  constructor(
    protected triggerConfig: TriggerConfig,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected outletRenderService: OutletRenderService,
    protected inlineRenderService: InlineRenderService,
    protected routingRenderService: RoutingRenderService
  ) {}

  render(
    caller: TRIGGER_CALLER,
    component?: any,
    vcr?: ViewContainerRef
  ): void {
    const config = this.findConfiguration(caller);
    if (Boolean((config as TriggerUrlMapping).cxRoute)) {
      this.routingRenderService.render(config as TriggerUrlMapping);
    } else if (
      this.shouldRender(caller, config as TriggerMapping) &&
      component
    ) {
      const template = this.componentFactoryResolver.resolveComponentFactory(
        component
      );
      if (Boolean((config as TriggerOutletMapping).outlet)) {
        this.outletRenderService.render(
          config as TriggerOutletMapping,
          template
        );
      } else if (Boolean((config as TriggerInlineMapping).inline) && !!vcr) {
        this.inlineRenderService.render(template, vcr);
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

  private findConfiguration(
    caller: TRIGGER_CALLER
  ): TriggerOutletMapping | TriggerInlineMapping | TriggerUrlMapping {
    return this.triggerConfig?.trigger[caller];
  }
}
