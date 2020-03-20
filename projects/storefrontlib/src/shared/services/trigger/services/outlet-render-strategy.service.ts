import {
  ComponentFactory,
  ComponentFactoryResolver,
  Injectable,
} from '@angular/core';
import {
  OutletPosition,
  OutletService,
} from '../../../../cms-structure/outlet/index';
import { TriggerOutletMapping, TRIGGER_CALLER } from '../config/index';
import { RenderStrategy } from './render.strategy';

@Injectable({ providedIn: 'root' })
export class OutletRenderService extends RenderStrategy {
  protected renderedCallers: TRIGGER_CALLER[] = [];

  constructor(
    protected outletService: OutletService<ComponentFactory<any>>,
    protected componentFactoryResolver: ComponentFactoryResolver
  ) {
    super();
  }

  public render(config: TriggerOutletMapping, caller: TRIGGER_CALLER) {
    if (this.shouldRender(caller, config)) {
      const template = this.componentFactoryResolver.resolveComponentFactory(
        config.component
      );
      this.outletService.add(
        config.outlet,
        template,
        config.position ? config.position : OutletPosition.BEFORE
      );
      this.renderedCallers.push(caller);
    }
  }

  public strategy(config: TriggerOutletMapping) {
    return Boolean(config.outlet);
  }
}
