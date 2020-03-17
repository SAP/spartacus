import {
  ComponentFactory,
  ComponentFactoryResolver,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import {
  OutletPosition,
  OutletService,
} from '../../../../cms-structure/outlet/index';
import {
  TriggerConfig,
  TriggerInlineMapping,
  TriggerMapping,
  TriggerOutletMapping,
  TriggerUrlMapping,
  TRIGGER_CALLER,
} from '../config/trigger-config';

@Injectable({ providedIn: 'root' })
export class TriggerService {
  // Keep a list of rendered elements
  protected renderedCallers: TRIGGER_CALLER[] = [];

  constructor(
    protected outletService: OutletService<ComponentFactory<any>>,
    protected triggerConfig: TriggerConfig,
    protected componentFactoryResolver: ComponentFactoryResolver
  ) {}

  render(
    caller: TRIGGER_CALLER,
    component?: any,
    vcr?: ViewContainerRef
  ): void | string {
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
      } else if (Boolean((config as TriggerInlineMapping).inline) && !!vcr) {
        this.renderInline(template, vcr);
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
    template: ComponentFactory<any>
  ) {
    this.outletService.add(
      config.outlet,
      template,
      config.position ? config.position : OutletPosition.BEFORE
    );
  }

  protected renderInline(
    template: ComponentFactory<any>,
    vcr: ViewContainerRef
  ) {
    vcr.createComponent(template);
  }

  private findConfiguration(
    caller: TRIGGER_CALLER
  ): TriggerOutletMapping | TriggerInlineMapping | TriggerUrlMapping {
    return this.triggerConfig?.trigger[caller];
  }
}
