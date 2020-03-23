import {
  ComponentFactoryResolver,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { TriggerInlineMapping, TRIGGER_CALLER } from '../config';
import { RenderStrategy } from './render.strategy';

@Injectable({ providedIn: 'root' })
export class InlineRenderStrategy extends RenderStrategy {
  protected element;

  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
    super();
  }

  public render(
    config: TriggerInlineMapping,
    caller: TRIGGER_CALLER,
    vcr: ViewContainerRef
  ) {
    // Only render if a ViewContainerRef is provided
    if (vcr && this.shouldRender(caller, config)) {
      const template = this.componentFactoryResolver.resolveComponentFactory(
        config.component
      );
      vcr.createComponent(template);
      this.renderedCallers.push({ caller, element: vcr.element });
    }
  }

  public isStrategyForConfiguration(config: TriggerInlineMapping) {
    return Boolean(config.inline);
  }
}
