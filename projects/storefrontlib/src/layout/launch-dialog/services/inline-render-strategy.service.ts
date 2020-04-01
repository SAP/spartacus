import {
  ComponentFactoryResolver,
  Injectable,
  isDevMode,
  ViewContainerRef,
} from '@angular/core';
import { LaunchInlineDialog, LAUNCH_CALLER } from '../config';
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
    caller: LAUNCH_CALLER,
    vcr: ViewContainerRef
  ) {
    // Only render if a ViewContainerRef is provided
    if (vcr && this.shouldRender(caller, config)) {
      const template = this.componentFactoryResolver.resolveComponentFactory(
        config.component
      );
      vcr.createComponent(template);
      this.renderedCallers.push({ caller, element: vcr.element });
    } else if (isDevMode()) {
      if (!vcr) {
        console.warn(`No view container ref provided for ${caller}`);
      } else {
        console.warn(
          `Element for ${caller} already rendered. To allow multi rendering add property multi: true.`
        );
      }
    }
  }

  match(config: LaunchInlineDialog) {
    return Boolean(config.inline);
  }
}
