import {
  ComponentFactoryResolver,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { TriggerInlineMapping, TRIGGER_CALLER } from '../config';
import { RenderStrategy } from './render.strategy';

@Injectable({ providedIn: 'root' })
export class InlineRenderStrategy extends RenderStrategy {
  protected renderedCallers: TRIGGER_CALLER[] = [];

  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
    super();
  }

  public render(config: TriggerInlineMapping, caller: TRIGGER_CALLER) {
    const vcr = this.getVcr(config);

    // Only render if a ViewContainerRef is provided
    if (vcr && this.shouldRender(caller, config)) {
      const template = this.componentFactoryResolver.resolveComponentFactory(
        config.component
      );
      vcr.createComponent(template);
      this.renderedCallers.push(caller);
    }
  }

  public strategy(config: TriggerInlineMapping) {
    return Boolean(config.inline);
  }

  protected getVcr(config: TriggerInlineMapping): ViewContainerRef {
    return config.options?.vcr ? config.options.vcr : null;
  }
}
