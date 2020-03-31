import {
  ComponentFactoryResolver,
  Injectable,
  isDevMode,
  ViewContainerRef,
} from '@angular/core';
import { LaunchInlineDialog, TRIGGER_CALLER } from '../config';
import { LaunchRenderStrategy } from './launch-render.strategy';

@Injectable({ providedIn: 'root' })
export class InlineRenderStrategy extends LaunchRenderStrategy {
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
  render(
    config: LaunchInlineDialog,
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

  match(config: LaunchInlineDialog) {
    return Boolean(config.inline);
  }
}
