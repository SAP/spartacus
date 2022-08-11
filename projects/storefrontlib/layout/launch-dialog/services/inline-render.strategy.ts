import { DOCUMENT } from '@angular/common';
import {
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  isDevMode,
  RendererFactory2,
  ViewContainerRef,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { LaunchInlineDialog, LAUNCH_CALLER } from '../config/index';
import { LaunchRenderStrategy } from './launch-render.strategy';

@Injectable({ providedIn: 'root' })
export class InlineRenderStrategy extends LaunchRenderStrategy {
  constructor(
    @Inject(DOCUMENT) protected document: any,
    protected rendererFactory: RendererFactory2,
    protected componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(document, rendererFactory);
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
    caller: LAUNCH_CALLER | string,
    vcr: ViewContainerRef
  ): Observable<ComponentRef<any>> | void {
    // Only render if a ViewContainerRef is provided
    if (vcr && this.shouldRender(caller, config)) {
      const template = this.componentFactoryResolver.resolveComponentFactory(
        config.component
      );

      const component = vcr.createComponent(template);

      if (config?.dialogType) {
        this.applyClasses(component, config?.dialogType);
      }

      this.renderedCallers.push({ caller, element: vcr.element, component });

      return of(component);
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

  hasMatch(config: LaunchInlineDialog) {
    return Boolean(config.inline);
  }
}
