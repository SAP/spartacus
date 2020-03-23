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
import { TriggerOutletMapping, TRIGGER_CALLER } from '../config/index';
import { RenderStrategy } from './render.strategy';

@Injectable({ providedIn: 'root' })
export class OutletRenderStrategy extends RenderStrategy {
  constructor(
    protected outletService: OutletService<ComponentFactory<any>>,
    protected componentFactoryResolver: ComponentFactoryResolver
  ) {
    super();
  }

  public render(
    config: TriggerOutletMapping,
    caller: TRIGGER_CALLER,
    vcr?: ViewContainerRef
  ) {
    if (this.shouldRender(caller, config)) {
      const template = this.componentFactoryResolver.resolveComponentFactory(
        config.component
      );
      this.outletService.add(
        config.outlet,
        template,
        config.position ? config.position : OutletPosition.BEFORE
      );

      const renderedCaller = vcr?.element
        ? { caller, element: vcr.element }
        : { caller };
      this.renderedCallers.push(renderedCaller);
    }
  }

  public isStrategyForConfiguration(config: TriggerOutletMapping) {
    return Boolean(config.outlet);
  }
}
