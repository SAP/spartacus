import {
  ComponentFactoryResolver,
  Injectable,
  isDevMode,
  ViewContainerRef,
} from '@angular/core';
import { TriggerInlineMapping, TRIGGER_CALLER } from '../config';
import { RenderStrategy } from './render.strategy';

@Injectable({ providedIn: 'root' })
export class InlineRenderStrategy extends RenderStrategy {
  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
    super();
  }

  /**
   * Renders the component from the configuration in the view container ref
   *
   * @param config
   * @param caller
   * @param vcr
   */
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
    } else if (!vcr && isDevMode()) {
      console.warn(`No view container ref provided for ${caller}`);
    }
  }

  public isStrategyForConfiguration(config: TriggerInlineMapping) {
    return Boolean(config.inline);
  }
}
