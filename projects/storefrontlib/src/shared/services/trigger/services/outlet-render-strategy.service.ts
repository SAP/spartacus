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
import { OutletRendererService } from '../../../../cms-structure/outlet/outlet-renderer.serivce';
import { TriggerOutletMapping, TRIGGER_CALLER } from '../config/index';
import { RenderStrategy } from './render.strategy';

@Injectable({ providedIn: 'root' })
export class OutletRenderStrategy extends RenderStrategy {
  constructor(
    protected outletService: OutletService<ComponentFactory<any>>,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected outletRendererService: OutletRendererService
  ) {
    super();
  }

  /**
   * Renders the element in the configured outlet
   *
   * @param config
   * @param caller
   * @param vcr
   */
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
      this.outletRendererService.render(config.outlet);

      const renderedCaller = vcr?.element
        ? { caller, element: vcr.element }
        : { caller };
      this.renderedCallers.push(renderedCaller);
    }
  }

  public match(config: TriggerOutletMapping) {
    return Boolean(config.outlet);
  }

  public removeRendered(
    caller: TRIGGER_CALLER,
    config: TriggerOutletMapping
  ): void {
    const template = this.componentFactoryResolver.resolveComponentFactory(
      config.component
    );
    this.renderedCallers = this.renderedCallers.filter(
      (el) => el.caller === caller
    );

    this.outletService.remove(
      config.outlet,
      config.position ? config.position : OutletPosition.BEFORE,
      template
    );
  }
}
